/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};

instamsg.Message = function (content,options) {

    var self = this;
    var retained = options.retain || false;
    var Qos = options.qos;
    var body = content || "";
    var isDup = options.dup || false;
    var Topic = options.topic;
    var replyTopic = options.replyTopic;
    var id = options.id;


    self.qos = function () {
        return Qos;
    };

    self.retained = function () {
        return retained;
    };

    self.id = function () {
        return id;
    };

    self.topic = function () {
        return Topic;
    };

    self.replyTopic = function () {
        return replyTopic;
    };

    self.isDublicate = function () {

        return isDup;
    };

    self.body = function () {
        return body;

    };

    self.reply = function (msg,dup, replyHandler, timeout) {

        instamsg.reply(msg, self, replyHandler, timeout)
    };

    self.error = function (errorCode, errorMsg) {

    };

    self.toString = function () {
        return '{ id=' + id + ', topic=' + Topic + ', body=' + body + ', qos=' + Qos + ', dup=' + isDup + ', replyTopic=' + replyTopic + '}';

    }

}




