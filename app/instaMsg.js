/**
 * Created by gsachan on 29/12/14.
 */


var instamsg = instamsg || {};

instamsg.InstaMsg = function (clientId, authKey, connectHandler, disConnectHandler, oneToOneMessageHandler, options) {

    options = options || {};
//    var self = this;
    if (clientId === null || clientId === undefined) {
        console.log('You must pass your client id when you instantiate InstaMsg.');
        throw new Error("You must pass your client id when you instantiate InstaMsg.");
        return false;
    }

    if (authKey === null || authKey === undefined) {
        console.log('You must pass your auth key when you instantiate InstaMsg.');
        throw new Error("You must pass your auth key when you instantiate InstaMsg.");
        return false;
    }
    options.clientId = clientId.substring(0, 23);
    options.userName = clientId.substring(24, 36);
    options.password = authKey;
    var logLevel = options.logLevel || false
    instamsg.version = 'beta';
    instamsg.handlersMap = {}
    instamsg.replyHandlerMap = {}
    var filesTopic = "instamsg/clients/" + clientId + "/files";
    var enableServerLoggingTopic = clientId + "/enableServerLogging";
    var serverLogsTopic = "";
    var logToServer = false
    var sendMsgReplyTopic = clientId;

    instamsg.fileHandlers = [];
    instamsg.sendMsgHandlers = [];
    instamsg.resultHandler = [];
    var onMessageArrived = function (msg) {
        var topic = msg._getDestinationName()
        if (topic === null || topic === undefined) {
            throw new Error("Invalid topic");
        }
        if (logLevel) {
            console.log("message Arrived : " + msg.payloadString);
        }
        console.log("topic is : " + topic);
        switch (topic) {
            case enableServerLoggingTopic:
                logToServer = true;
                var id = msg.payloadString.split("-")
                if (id.length != 5) {
                    throw new Error("Invalid CLient id " + msg.payloadString);
                } else {
                    serverLogsTopic = "instamsg/" + msg.payloadString + "/logs";
                }
                break;
            case filesTopic:
                try {
                    var json = JSON.parse(msg.payloadString);
                    if (instamsg.fileHandlers[topic]) {
                        var message = new instamsg.Message(json.body, {id: json.message_id, topic: json.topic, replyTopic: json.reply_to})
                        instamsg.fileHandlers[topic](message)
                    } else {
                        throw new Error("No Handler is register for " + topic);
                    }
                }
                catch (e) {
                    if (logLevel) {
                        console.log(e);
                    }
                }
                break;
            case sendMsgReplyTopic:
                try {
                    var json = JSON.parse(msg.payloadString);
                    var messageId = json.message_id;
                    var responseId = json.response_id;
                    if (responseId) {
                        if (instamsg.handlersMap[responseId]) {
                            var message = new instamsg.Message(json.body, {id: json.message_id, topic: json.topic, replyTopic: json.reply_to})
                            instamsg.replyHandlerMap[responseId](message)
                        }
                    } else {
                        if (oneToOneMessageHandler) {
                            
                            var message = new instamsg.Message(json.body, {id: json.message_id, topic: json.topic, replyTopic: json.reply_to})
                            oneToOneMessageHandler(message)
                        }
                    }
                }
                catch (e) {
                    if (instamsg.handlersMap[topic]) {
                        instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString))
                    }
                }
                break;
            default:
                try {

                    if (instamsg.handlersMap[topic]) {
                        instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString,{topic:topic}))
                    } else {
                        throw new Error("No Handler is register for " + topic);
                    }
                }
                catch (e) {
                    if (logLevel) {
                        console.log(e.message);
                    }
                }
                break;
        }
    };

    var netError = false
    var closeHandler = function (object) {
        try {
            if (object.hasOwnProperty('errorCode')) {
                netError = true
                connection.connect()
            } else {
                disConnectHandler(object)
            }
        } catch (e) {
            if (logToServer) console.log(e)
        }
    }
    var i = 1
    var onOpenHandler = function (obj) {
        i = i + 1
        if (i > 10)  i = 0
        if (netError) {
            if (logToServer) console.log("Disconnected, Trying to reconnect.")
            setTimeout(function () {
                connection.connect()
            }, i * 10000);
        } else {
            connectHandler(obj)
        }
    }
    var connection = instamsg.ConnectionFactory(onOpenHandler, onMessageArrived, closeHandler, options);
    connection.connect()
    instamsg.close = function () {
        connection.close();
    };

    var publishServerLogs = function (message) {
        var id = UUIDjs.create(4).toString()
        connection.publish(id, serverLogsTopic, message, 0, 0, onPublish, 100);
    };

    var onPublish = function (msg) {
        msg.payload = msg._getPayloadString()
        if (msg._getDestinationName() != serverLogsTopic) {
            if (logToServer)  publishServerLogs("message published : " + JSON.stringify(msg))
            if (logLevel) {
                console.log("message published : " + JSON.stringify(msg));
            }
            if (instamsg.resultHandler[msg.id]) {
                instamsg.resultHandler[msg.id](instamsg.Result.init(msg, true))
            }
            delete instamsg.resultHandler[msg.id];
        }
    }

    instamsg.publish = function (topic, message, qos, dup, resultHandler, timeout) {
        var id = UUIDjs.create(4).toString()
        instamsg.resultHandler[id] = resultHandler;
        connection.publish(id, topic, message, qos, dup, onPublish, timeout);
    };

    instamsg.subscribe = function (topic, qos, msgHandler, resultHandler, timeout) {
        if (topic.length < 1) {
            if (logToServer)  publishServerLogs("Topic cannot be empty")
            if (logLevel) console.log("Topic cannot be empty");

            throw new Error("Topic cannot be empty ");
        }
        if (instamsg.handlersMap[topic] !== undefined) {
            if (logToServer)  publishServerLogs("Topic cannot be empty")
            if (logLevel)  console.log('You are already subscribed to ' + topic);

        }
        var subscriptionobj = {};
        subscriptionobj.topic = topic;
        subscriptionobj.msgHandler = msgHandler;
        subscriptionobj.resultHandler = resultHandler;
        connection.subscribe(topic, subscriptionobj, qos, onSubscribeSuccess, onSubscribeFailure);
    };

    var onSubscribeSuccess = function (subscriptionobj) {
        instamsg.handlersMap[subscriptionobj.invocationContext.topic] = subscriptionobj.invocationContext.msgHandler;
        var result = "Client Subscribe to " + subscriptionobj.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result);
        }
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(result, true))
    }

    var onSubscribeFailure = function (subscriptionobj) {
        var result = "Client unable to Subscribe to " + subscriptionobj.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result);
        }
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(subscriptionobj, false))
    }

    instamsg.unsubscribe = function (topic, msgHandler) {
        if (instamsg.handlersMap[topic] === undefined) {
            if (logToServer)  publishServerLogs('You are not subscribed to ' + topic)
            if (logLevel) {
                console.log('You are not subscribed to ' + topic);
            }
        }
        connection.unsubscribe(topic, {topic: topic, resultHandler: msgHandler}, onUnsubscribeSuccess, onUnsubscribeFailure)
    };

    var onUnsubscribeSuccess = function (object) {
        delete instamsg.handlersMap[object.invocationContext.topic];
        var result = "Client unsubscribe from " + object.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result);
        }
        object.invocationContext.resultHandler(instamsg.Result.init(result, true))
    }

    var onUnsubscribeFailure = function (object) {
        var result = "Not able to unsubscribe to " + object.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result)
        }
        object.invocationContext.resultHandler(instamsg.Result.init(object, false))
    }

    instamsg.send = function (clientId, msg, qos, replyHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.replyHandlerMap[messageId] = replyHandler;
        var message = {
            message_id: messageId,
            topic: clientId,
            reply_to: sendMsgReplyTopic,
            body: msg,
            status: 1
        }
        if (logToServer)  publishServerLogs("sending one to one message " + JSON.stringify(message))
        if (logLevel) {
            console.log("sending one to one message " + JSON.stringify(message));
        }
        connection.send(clientId, message, qos, replyHandler, timeout);
    };

    instamsg.setFileReceiveHander = function (resultHandler, timeout) {

    };

    instamsg.deleteFile = function (clientId, fileName, resultHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.fileHandlers[messageId] = resultHandler;
        var message = {
            messageId: messageId,
            replyTo: filesTopic,
            method: "DELETE",
            filename: fileName
        }
        connection.send("instamsg/clients/" + clientId + "/files", message, 1, timeout);

    };

    instamsg.reply = function (content, msg, qos, replyHandler, timeout) {
        if (!instamsg.replyHandlerMap[msg.id()]) {
            instamsg.replyHandlerMap[msg.id()] = replyHandler;
        }
        var message = {
            message_id: msg.id(),
            response_id: msg.id(),
            topic: msg.replyTopic(),
            reply_to: msg.topic(),
            body: content,
            status: 1
        }
        if (logLevel) {
            console.log("sending reply message " + JSON.stringify(message));
        }
        if (logToServer)  publishServerLogs("sending reply message " + JSON.stringify(message))
        connection.send(msg.replyTopic(), message, qos, replyHandler, timeout);
    };
    return instamsg;
}

