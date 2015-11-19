/**
 * Created by gsachan on 20/2/15.
 */

var connectHandler = function(obj,b){
    console.log("Client connected to instaMsg.");
    //setInterval(send, 3000);   
    //recieve();
}

var send = function(){
    instamsg.send("recievedid", "test-message", 0, oneToOneMessageReplyHandler, 100);
}


var recieve = function(){
    instaMsg.subscribe("pub1",1,msgHandler,onSubscribeResultHandler,60);
}

var disConnectHandler = function(){
    console.log("Client disconnected.")
}

var oneToOneMessageReplyHandler = function(msg){
    console.log("oneToOne Message Reply Handler.");
}

var oneToOneMessageHandler = function(msg){
    console.log(msg);
    console.log("one to one message received.")
    msg.reply("This is a reply to a one to one message.", 0, oneToOneMessageReplyHandler)
}

var instaMsg=instamsg.InstaMsg("ClientId","authtoken",connectHandler, disConnectHandler, oneToOneMessageHandler,{"enableSsl":true})

var publishMsgResultHandler = function(msg){
    console.log("publish Message Reply Handler.")
}

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


var onUnsubscribeResultHandler = function(result){
    if(result.failed()) {
        console.log("unable to unsubscribe " )
    } else {
        console.log("unsubscribed " )
    }
}

/*instaMsg.unsubscribe("topic",onUnsubscribeResultHandler)
instaMsg.close()
*/