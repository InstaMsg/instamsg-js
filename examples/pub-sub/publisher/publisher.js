var clientId = '39e615c0-f668-11e5-95f5-bc764e102b63';
var clientAuthToken = 'cc61f02d228348de8f705287e6a6d0aa';
//var topic = 'listener_topic';
var subscribe_topic = 'test_topic';
var publish_topic = 'mark_topic';
//var message = 'Test';

var options = {
	enableSsl : true
};

var instaMsg = undefined;

var connect = function(){
	instaMsg = instamsg.InstaMsg(clientId,clientAuthToken,connectHandler, disConnectHandler, oneToOneMessageHandler, options);
}

var connectHandler = function(a,b){
	//alert("Client connected to instaMsg.");
	document.getElementById('connectForm').setAttribute("class", "hide");
	document.getElementById('connectExample').setAttribute("class", "row");
    //setInterval(publish, 3000);
	subscribeMessage();
};

var counter = 1;

var publish = function(){
//	instaMsg.publish(topic, message+" "+counter++, 0, 1, publishMsgResultHandler, 100);
};

var publishMessage = function(){
	var msg = document.getElementById("message-box1").value;
	console.log(publish_topic);
	console.log(instamsg.SocketConnection.client.isConnected());
	instaMsg.publish(publish_topic, msg, 0, 1, pubMsgResultHandler, 100);
};

var subscribeMessage = function(){
	instaMsg.subscribe(subscribe_topic, 1, msgHandler, onSubscribeResultHandler, 60);
};

var msgHandler = function(msg){
	//console.log('msg rec');
    var table = document.getElementById("recieved");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = msg.topic();
	cell2.innerHTML = msg.body();
	cell3.innerHTML = msg.succeeded()?"Send":"Failed";
}

var onSubscribeResultHandler = function (result) {
    if(result.failed()) {
        console.log("unable to subscribe " );
    } else {
        console.log("publisher subscribed " );
    }
}

var pubMsgResultHandler = function(msg){
	console.log(msg.result());
}

var publishMsgResultHandler = function(msg){
	var message = msg.result();
    var table = document.getElementById("send");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = message.destinationName;
	cell2.innerHTML = message.payload;
	cell3.innerHTML = msg.succeeded()?"Send":"Failed";
}


var disConnectHandler = function(){
	console.log("Client disconnected.")
};

var oneToOneMessageHandler = function(){

};

connect();
