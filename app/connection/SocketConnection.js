/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};
instamsg.SocketConnection = instamsg.SocketConnection || {}
instamsg.SocketConnection.connection = function (onOpenHandler, onMsgHandler, onCloseHandler, options) {

    options = options || {};
    var self = this;

    instamsg.SocketConnection.host = 'localhost';
    instamsg.SocketConnection.httpPort = 11883;
    instamsg.SocketConnection.httpsPort = 18883;
    instamsg.SocketConnection.port = options.enableSsl ? self.httpsPort : self.httpPort;
    instamsg.SocketConnection.client = new Paho.MQTT.Client(instamsg.SocketConnection.host, Number(instamsg.SocketConnection.port), options.clientId);

    instamsg.SocketConnection.client.onMessageArrived = onMsgHandler;

    instamsg.SocketConnection.client.onConnectionLost =onCloseHandler;

    instamsg.SocketConnection.client.onMessageDelivered;

    instamsg.SocketConnection.publish = function (id,topic,msg,qos,dup,resultHandler,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log('InstaMsg socket is not connected.');
            return false;
        }
        var message =new Paho.MQTT.Message(msg)
        message.id =id
        message.qos =qos;
        message.dup =dup;
        message.retained = false;
        message.destinationName=topic;
        instamsg.SocketConnection.client.onMessageDelivered =resultHandler;
        instamsg.SocketConnection.client.send(message);
    }

    instamsg.SocketConnection.send = function (clientId,msg,qos,resultHandler, timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log('InstaMsg socket is not connected.');
            return false;
        }
        var payload =JSON.stringify(msg)
        var message =new Paho.MQTT.Message(payload)
        message.qos =qos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ;
        message.retained = true;
        message.destinationName=clientId;
        console.log("sending " + payload)
        instamsg.SocketConnection.client.onMessageDelivered =resultHandler;
        instamsg.SocketConnection.client.send(message);
    }

    instamsg.SocketConnection.close = function () {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is already disconnected.");
            throw new Error("InstaMsg socket is already disconnected.");
            return false;
        }
        instamsg.SocketConnection.client.disconnect();
    }

    instamsg.SocketConnection.onFail = function (message) {
        console.log("error: " + message.errorMessage);
    }

    var onConnect = function (result) {
        onOpenHandler(instamsg.Result.init("Connect to InstaMsg socket.", true))
    }
    var onFailure = function (result) {
        onOpenHandler(instamsg.Result.init(result.errorMessage, false))
    }


    instamsg.SocketConnection.subscribe = function (topic, invocationContext,qos,onSubscribeSuccess,onSubscribeFailure,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is not connected.");
            throw new Error("InstaMsg socket is not connected.");
            return false;
        }
        if (topic.length < 1) {
            console.log("Topic cannot be empty.");
            throw new Error("Topic cannot be empty.");
            return false;
        }
        instamsg.SocketConnection.client.subscribe(topic, {invocationContext: invocationContext,
            qos: qos,
            onSuccess: onSubscribeSuccess,
            onFailure: onSubscribeFailure,
            timeout: timeout ? timeout : 60
        });
    };

    instamsg.SocketConnection.unsubscribe = function (topic,invocationContext,onUnsubscribeSuccess,onUnsubscribeFailure,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is not connected.");
            throw new Error("InstaMsg socket is not connected.");
            return false;
        }
        instamsg.SocketConnection.client.unsubscribe(topic, {invocationContext: invocationContext,
            onSuccess: onUnsubscribeSuccess,
            onFailure: onUnsubscribeFailure,
            timeout: timeout ? timeout : 100
        })
    };

    var Options = {
        timeout: 100,
        userName: options.userName,
        password: options.password,
        keepAliveInterval: options.keepAliveTimer || 100 ,
        cleanSession: true,
        useSSL: options.enableSsl ? true : false,
        invocationContext: instamsg,
        onSuccess: onConnect,
        onFailure: onFailure,
        mqttVersion: 3
    }
    instamsg.SocketConnection.client.connect(Options);
    return instamsg.SocketConnection;
}
