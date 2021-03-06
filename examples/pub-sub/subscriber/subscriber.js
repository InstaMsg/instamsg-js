var clientId = '11f88700-f668-11e5-95f5-bc764e102b63';
var clientAuthToken = '0bd3a1c7817a4a1da772a89fcca48523';
//var topic = 'listener_topic';
var publish_topic = 'test_topic';
var subscribe_topic = 'mark_topic';

var options = {
	enableSsl : true
};

var instaMsg1 = undefined;

var connect = function(){
	instaMsg1 = instamsg.InstaMsg(clientId,clientAuthToken,connectHandler, disConnectHandler, oneToOneMessageHandler, options);
}

var connectHandler = function(a,b){
	//alert("Client connected to instaMsg.");
	connectForm
	document.getElementById('connectForm').setAttribute("class", "hide");
	document.getElementById('connectExample').setAttribute("class", "row");
    subscribe();
};

var subscribe = function(){
	instaMsg1.subscribe(subscribe_topic, 1, msgHandler, onSubscribeResultHandler, 60);
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
        console.log("subscribed " );
    }
}


var disConnectHandler = function(){
	console.log("Client disconnected.")
};

var oneToOneMessageHandler = function(){

};

var publishMessage2 = function(){
	var msg = document.getElementById("message-box2").value;
	instaMsg1.publish(publish_topic, msg, 0, 1, pubMsgHandler, 100);
	
};

var pubMsgHandler = function(msg){
	var message = msg.result();
    console.log(message);
}

var pubMsgHandler = function(msg){
	var message = msg.result();
    var table = document.getElementById("recieved");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = message.destinationName;
	cell2.innerHTML = message.payload;
}

connect();
