/**
 * Created by gsachan on 20/2/15.
 */

var connectHandler = function(obj,b){
    console.log("Client connected to instaMsg.");
}

var disConnectHandler = function(){
    console.log("Client disconnected.")
}

var oneToOneMessageReplyHandler = function(msg){
    console.log("oneToOne Message Reply Handler.")
}
var oneToOneMessageHandler = function(msg){
    console.log("one to one message received.")
    msg.reply("This is a reply to a one to one message.")
}

var instaMsg=instamsg.InstaMsg("client_id","client_secret",connectHandler, disConnectHandler, oneToOneMessageHandler)

var publishMsgResultHandler = function(msg){
    console.log("oneToOne Message Reply Handler.")
}

instamsg.publish("topic", "test-message",0,1,publishMsgResultHandler,100)


var onSubscribeResultHandler = function (result) {
    if(result.failed()) {
        console.log("unable to subscribe " )
    } else {
        console.log("subscribed " )
    }
}

var msgHandler = function(msg){
    console.log("message received " +msg)
}


instaMsg.subscribe("topic",1,msgHandler,onSubscribeResultHandler,60)

var onUnsubscribeResultHandler = function(result){
    if(result.failed()) {
        console.log("unable to unsubscribe " )
    } else {
        console.log("unsubscribed " )
    }
}

instaMsg.unsubscribe("topic",onUnsubscribeResultHandler)

instaMsg.close()