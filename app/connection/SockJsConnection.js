/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};

instamsg.SockjsConnection = instamsg.SockjsConnection || {}
instamsg.SockjsConnection.connection = function (onOpenHandler, onMsgHandler, onCloseHandler,options) {

    var self = this;
   var options = options || {};
    //instamsg.SockjsConnection.host = 'sockjs.instamsg.com';
    instamsg.SockjsConnection.host = 'sockjs.instamsg.com';
    instamsg.SockjsConnection.httpPort = 80;
    instamsg.SockjsConnection.httpsPort = 443;
    instamsg.SockjsConnection.path = "/instamsg";
    instamsg.SockjsConnection.port =  options.enabledSsl ? self.httpsPort : self.httpPort;
    var sock = new SockJS(self.host+":"+self.port+"/"+self.path);

    instamsg.SockjsConnection.onopen = onOpenHandler;
    instamsg.SockjsConnection.onmessage = onMsgHandler;
    instamsg.SockjsConnection.onclose = onCloseHandler;

    instamsg.SockjsConnection.publish = function (topic,msg,qos) {
        if (state != vertx.EventBus.OPEN) {
            throw new Error('INVALID_STATE_ERR');
        }
        var message = new Paho.MQTT.Message(msg);
        message.qos =qos;
        message.retained = true;
        message.destinationName=topic;
        sock.send(message);
    }

    instamsg.SockjsConnection.send = function (clientId,msg,qos,replyHandler, timeout) {
        if (state != vertx.EventBus.OPEN) {
            throw new Error('INVALID_STATE_ERR');
        }
        var payload =JSON.stringify(msg)
        var message = new Paho.MQTT.Message(payload);
        message.qos =qos;
        message.retained = true;
        message.destinationName=topic;
        sock.send(message);
    }

    instamsg.SockjsConnection.close = function () {
        sock.close();
        onCloseHandler()
    }

}