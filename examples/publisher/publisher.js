var clientId = '00125580-e29a-11e4-ace1-bc764e102b63';
var clientAuthToken = 'password';
var topic = 'pubtopics';
var message = 'message';

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
    setInterval(publish, 3000);
};

var counter = 1;

var publish = function(){
	instamsg.publish(topic, message+" "+counter++, 0, 1, publishMsgResultHandler, 100);
};

var publishMsgResultHandler = function(msg){
	console.log(msg);
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