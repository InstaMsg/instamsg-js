var MEDIA_MESSAGE_TYPE = {
		ERROR: "0",
	    CALL: "1",
	    CALL_REPLY: "2",
	    CALL_STOP: "3",
	    CALL_INCOMING: "4",
	    CALL_INCOMING_REPLY: "5",
	    CALL_INCOMING_START: "6",
	    BROADCAST: "7",
	    BROADCAST_REPLY: "8",
	    SUBSCRIBE: "9",
	    SUBSCRIBE_REPLY: "10",
	    RECORDING_PLAY: "11",
	    RECORDING_PLAY_REPLY: "12",
	    RECORDING_PLAY_STOP: "13",
	    RECORDING_PLAY_END: "14",
		ICE_CANDIDATE: "15",
		ICE_CANDIDATE_REPLY: "16"
	};

var instamsg = instamsg || {};

instamsg.InstaMedia = function (from, authKey, connectHandler){

	var video;
	var webRtcPeer;
	
	var instaMsg;
	var streamId;
	var to = from;

	var mediaReplyTopic = "instamsg/clients/" + from + "/mediareply";
//	var mediaReplyTopic = "bd9d8610-0509-11e5-9240-a41731f2549f/instamsg/clients/" + from + "/mediareply";
	var mediaSendTopic;
	var mediaStreamsTopic;
	
	var onSubscribeSuccess = function(result) {
		if (result.failed()) {
			console.log("unable to subscribe ");
		} else {
			console.log("subscribed to topic " + mediaReplyTopic);
		}
	}

	var handler = function(msg) {
		var responseMessage = msg.body();
		console.log("Reply msg received : " + responseMessage)
		var parsedMessage = eval("(" + responseMessage + ")");
		console.log("msg type is : " + parsedMessage.type)

		switch (parsedMessage.type) {
		case MEDIA_MESSAGE_TYPE.BROADCAST_REPLY:
			presenterResponse(parsedMessage);
			break;
		case MEDIA_MESSAGE_TYPE.SUBSCRIBE_REPLY:
			viewerResponse(parsedMessage);
			break;
		case MEDIA_MESSAGE_TYPE.ICE_CANDIDATE_REPLY:
			candidate = JSON.parse(parsedMessage.candidate)
			webRtcPeer.addIceCandidate(candidate, function(error) {
				if (error)
					return console.error('Error adding candidate: ' + error);
			});
			break;
		case MEDIA_MESSAGE_TYPE.CALL_STOP:
			dispose();
			break;
		default:
			console.error('Unrecognized message', parsedMessage);
		}
	}
	
	var streamHandler = function(msg) {
		var responseMessage = msg.body();
		console.log("Media streams msg received : " + responseMessage)
		var parsedMessage = eval("(" + responseMessage + ")");
		console.log(parsedMessage)
        var messageId = parsedMessage.message_id;
        var replyTo = parsedMessage.reply_to;
        if (replyTo) {
        	var message = {
        			response_id : messageId,
        			status : 1,
        			streams : streamId
        	}
        	sendInstaMessage(message, replyTo)
        }
	}

	if (connectHandler == undefined){
		connectHandler = function(result) {
			if (result.failed()) {
				console.log("InstaMsg not able to connect.");
			} else {
				console.log("InstaMsg socket connected.");
				instamsg.handlersMap[mediaReplyTopic] = handler;
				//instaMsg.subscribe(mediaReplyTopic, 1, handler, onSubscribeSuccess, 60)
			}
		}
	}
	
	var viewerConnectHandler = function(result) {
		if (result.failed()) {
			console.log("InstaMsg not able to connect.");
		} else {
			console.log("InstaMsg socket connected.");
		}
	}

	var disConnectHandler = function(result) {
		console.log("Connection lost with InstaMsg.")
	}

	var resultHandler = function (obj) {
		var json = JSON.parse(obj.payloadString);
		console.log("Result message is : " + json);
	}
	var timeout;

	var replyHandler = function (msg) {
		console.log("Reply message is : " + msg);
		}
	
	var oneToOneMessageHandler = function(msg) {
		console.log("One to one Media streams msg received : " + msg);
        var replyTo = msg.replyTo;
        console.log(replyTo);
        if (replyTo) {
        	var content = {
        			streams : [streamId]
        	}
        	msg.reply(replyTo, content, 1)
        }
	}
	
	var options = {
		logLevel : true,
		enableSsl : false
	}
	
	instaMsg = instamsg.InstaMsg(from, authKey, connectHandler,
			disConnectHandler, oneToOneMessageHandler, options)
			
	this.broadcast = function(strmId, elementId){
		
		streamId = strmId
		video = document.getElementById(elementId);
		console.log(from);
		mediaStreamsTopic = "instamsg/clients/" + from + "/mediastreams";
		mediaSendTopic = "instamsg/clients/" + from + "/media";
		instamsg.handlersMap[mediaStreamsTopic] = handler;
		//instaMsg.subscribe(mediaStreamsTopic, 1, streamHandler, onSubscribeSuccess, 60)
		
		if (!webRtcPeer) {
			showSpinner(video);

			var options = {
				localVideo : video,
				onicecandidate : onIceCandidate
			}
			webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
					options, function(error) {
						if (error) {
							return console.error(error);
						}
						webRtcPeer.generateOffer(onOfferPresenter);
					});
		}
	};

	this.view = function(broadcasterId, strmId, elementId){
		to = broadcasterId;
		mediaSendTopic = "instamsg/clients/" + broadcasterId + "/media";
		streamId = strmId
		video = document.getElementById(elementId);
		
		if (!webRtcPeer) {
			showSpinner(video);

			var options = {
				remoteVideo : video,
				onicecandidate : onIceCandidate
			}
			webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
					options, function(error) {
						if (error) {
							return console.error(error);
						}
						this.generateOffer(onOfferViewer);
					});
		}
	};

	this.stop = function(){
		var message = {
				type : MEDIA_MESSAGE_TYPE.CALL_STOP,
				to : to,
				from : from,
				stream_id : streamId,
		}
		sendInstaMessage(message, mediaSendTopic);
		dispose();
	};
	
	this.send = function(clientId, msg, qos, replyHandler, resultHandler, timeout){
		instaMsg.send(clientId, msg, qos, replyHandler, resultHandler, timeout)
	}
	
	this.disconnect = function(){
		instaMsg.close()
	}
	var getClientId = function(){
		if(viewerClientId){
			return viewerClientId;
		}
		else{
			return ClientId;
		}
	}

	var presenterResponse = function (message) {
		if (message.response == false) {
			var errorMsg = message.message ? message.message : 'Unknow error';
			console.log('Call not accepted for the following reason: ' + errorMsg);
			dispose();
		} else {
			streamId = message.stream_id
			webRtcPeer.processAnswer(message.sdp_answer, function(error) {
				if (error)
					return console.error(error);
			});
		}
	}

	var viewerResponse = function (message) {
		if (message.response == false) {
			var errorMsg = message.message ? message.message : 'Unknow error';
			console.log('Call not accepted for the following reason: ' + errorMsg);
			dispose();
		} else {
			webRtcPeer.processAnswer(message.sdp_answer, function(error) {
				if (error)
					return console.error(error);
			});
		}
	}

	var onOfferPresenter = function (error, offerSdp) {
		console.log("onOfferPresenter");
		if (error)
			return console.error('Error generating the offer');
		var message = {
			to : to,
			sdp_offer : offerSdp,
			from : from,
			protocol : 'webrtc',
			type : MEDIA_MESSAGE_TYPE.BROADCAST,
			stream_id : streamId,
			record : true
		};
		sendInstaMessage(message, mediaSendTopic);
	}

	var onOfferViewer = function (error, offerSdp) {
		if (error)
			return console.error('Error generating the offer');
		var message = {
			to : to,
			sdp_offer : offerSdp,
			from : from,
			protocol : 'webrtc',
			type : MEDIA_MESSAGE_TYPE.SUBSCRIBE,
			stream_id : streamId,
			record : true
		};
		sendInstaMessage(message, mediaSendTopic);
	}

	var onIceCandidate = function (candidate) {
		console.log("Local candidate" + JSON.stringify(candidate));

		var message = {
			type : MEDIA_MESSAGE_TYPE.ICE_CANDIDATE,
			to : to,
			from : from,
			stream_id : streamId,
			candidate : JSON.stringify(candidate)
		};
		sendInstaMessage(message, mediaSendTopic);
	}

	var dispose = function () {
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;
		}
		hideSpinner(video);
	};

	var sendInstaMessage = function (message, topic) {
		var jsonMessage = JSON.stringify(message);
		console.log('Sending message on topic : ' + topic + ' : ' + jsonMessage);
		instaMsg.publish(topic, jsonMessage, 1, 0)
	}
	var showSpinner = function () {
		for (var i = 0; i < arguments.length; i++) {
			arguments[i].poster = './img/transparent-1px.png';
			arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
		}
	};

	var hideSpinner = function () {
		for (var i = 0; i < arguments.length; i++) {
			arguments[i].src = '';
			arguments[i].poster = './img/webrtc.png';
			arguments[i].style.background = '';
		}
	};

};
