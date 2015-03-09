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
    instamsg.version='beta';
    instamsg.handlersMap = {}
    instamsg.replyHandlerMap = {}
    var filesTopic = "instamsg/clients/" + clientId + "/files";
    var sendMsgReplyTopic = clientId;

    instamsg.fileHandlers = [];
    instamsg.sendMsgHandlers = [];
    instamsg.resultHandler = [];
    var onMessageArrived = function (msg) {
        var topic = msg._getDestinationName()
        if(topic  === null || topic === undefined) {
            throw new Error("Invalid topic");
        }
        console.log("message Arrived.");
        switch (topic) {
            case filesTopic:
                var json = JSON.parse(msg.payloadString);
                    if (instamsg.fileHandlers[topic]) {
                        var message = new instamsg.Message(json.message,{id:json.message_id,topic:json.topic,reply_to:json.reply_to})
                        instamsg.fileHandlers[topic](message)
                    } else {
                        throw new Error("No Handler is register for " +topic);
                    }
                break;
            case sendMsgReplyTopic:
                var json = JSON.parse(msg.payloadString);
                console.log(json)
                var messageId = json.message_id;
                var responseId = json.response_id;
                if (responseId) {
                    if (oneToOneMessageHandler) {
                        var message = new instamsg.Message(json.message,{id:json.message_id,topic:json.topic,reply_to:json.reply_to})
                        oneToOneMessageHandler(message)
                    }
                } else {
                    if (instamsg.handlersMap[topic]) {
                        var message = new instamsg.Message(json.message,{id:json.message_id,topic:json.topic,reply_to:json.reply_to})
                        instamsg.handlersMap[topic](message)
                    }
                }
                break;
            default:
                if (instamsg.handlersMap[topic]) {
                    instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString))
                } else {
                    throw new Error("No Handler is register for " +topic);
                }
                break;
        }
    };

    var connection = instamsg.ConnectionFactory(connectHandler,onMessageArrived,disConnectHandler,options);

    instamsg.close = function () {
        connection.close();
    };

    instamsg.publish = function (topic, message,qos,dup,resultHandler,timeout) {
        var id = UUIDjs.create(4).toString()
        instamsg.resultHandler[id] = resultHandler;
        connection.publish(id,topic, message,qos,dup,onPublish,timeout);
    };

    var onPublish =function(msg){
        if(instamsg.resultHandler[msg.id]){
            instamsg.resultHandler[msg.id](instamsg.Result.init(msg,true))
        }
    }
    instamsg.subscribe = function (topic, qos,msgHandler,resultHandler,timeout) {
        if (topic.length < 1) {
            console.log("Topic cannot be empty");
            throw new Error("Topic cannot be empty ");
        }
        if (instamsg.handlersMap[topic] !== undefined) {
            console.log('You are already subscribed to ' + topic);
            throw new Error('You are already subscribed to ' + topic);
        }
        var subscriptionobj = {};
        subscriptionobj.topic = topic;
        subscriptionobj.msgHandler = msgHandler;
        subscriptionobj.resultHandler = resultHandler;
        connection.subscribe(topic, subscriptionobj, qos,onSubscribeSuccess, onSubscribeFailure);
    };

    var onSubscribeSuccess = function (subscriptionobj) {
        instamsg.handlersMap[subscriptionobj.invocationContext.topic] = subscriptionobj.invocationContext.msgHandler;
        console.log(instamsg.handlersMap)
            var  result=  "Client Subscribe to " + subscriptionobj.invocationContext.topic
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(result,true))
    }

    var onSubscribeFailure = function (subscriptionobj) {
        console.log("unable to suscribe to " +subscriptionobj.invocationContext.topic)
          var  result= "Client unable to Subscribe to " + subscriptionobj.invocationContext.topic
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(subscriptionobj,false))
    }

    instamsg.unsubscribe = function (topic,msgHandler) {
        if (instamsg.handlersMap[topic] === undefined) {
            console.log('You are not subscribed to this topic');
            throw new Error('You are not subscribed to this topic');
        }
        connection.unsubscribe(topic, {topic:topic,resultHandler:msgHandler},onUnsubscribeSuccess, onUnsubscribeFailure)
    };

    var onUnsubscribeSuccess = function (object) {
        console.log("unsubscribed to "+object.invocationContext.topic)
        delete instamsg.handlersMap[object.invocationContext.topic];
          var  result= "Client unsubscribe from " + object.invocationContext.topic
        object.invocationContext.resultHandler(instamsg.Result.init(result,true))
    }

    var onUnsubscribeFailure = function (object) {
        console.log("Not able to unsubscribe to "+object.invocationContext.topic)
        object.invocationContext.resultHandler(instamsg.Result.init(object,false))
    }

    instamsg.send = function (clientId, msg, qos,replyHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.replyHandlerMap[messageId] = replyHandler;
        var message = {
            message_id: messageId,
            topic: clientId,
            reply_to: sendMsgReplyTopic,
            message: msg,
            status: 1
        }
        connection.send(clientId, message,qos, timeout);
    };

    instamsg.setFileReceiveHander = function (resultHandler,timeout) {

    };

    instamsg.deleteFile = function (clientId, fileName, resultHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.fileHandlers[messageId] = resultHandler;
        var message = {
            messageId:messageId,
            replyTo:filesTopic,
            method:"DELETE",
            filename:fileName
        }
        connection.send("instamsg/clients/" + clientId + "/files", message,1, timeout);

    };

    instamsg.reply = function (content, msg,replyHandler, timeout) {
        if(!instamsg.replyHandlerMap[msg.id()]){
            instamsg.replyHandlerMap[msg.id()] = replyHandler;
        }
        var message = {
            message_id: msg.id(),
            response_id: msg.id(),
            topic: msg.replyTopic(),
            reply_to:msg.topic(),
            message: content,
            status: 1
        }
        connection.send(msg.replyTopic(), message,msg.qos(), replyHandler, timeout);
    };
    return instamsg;
}

