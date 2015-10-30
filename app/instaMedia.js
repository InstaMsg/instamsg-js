
var instamsg = instamsg || {};

instamsg.InstaMedia = function (ClientId, AuthKey, streamId, elementId, viewerClientId){

	var video = document.getElementById(elementId);
	var webRtcPeer;
	
	var instaMsg;

	var mediaReplyTopic = "instamsg/clients/" + ClientId + "/mediareply";
	var mediaSendTopic = "instamsg/clients/" + ClientId + "/media";
	
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
		case '8':
			presenterResponse(parsedMessage);
			break;
		case '10':
			viewerResponse(parsedMessage);
			break;
		case '16':
			candidate = JSON.parse(parsedMessage.candidate)
			webRtcPeer.addIceCandidate(candidate, function(error) {
				if (error)
					return console.error('Error adding candidate: ' + error);
			});
			break;
		case '3':
			dispose();
			break;
		default:
			console.error('Unrecognized message', parsedMessage);
		}
	}


	var connectHandler = function(result) {
		if (result.failed()) {
			console.log("InstaMsg not able to connect.");
		} else {
			console.log("InstaMsg socket connected.");
			instaMsg.subscribe(mediaReplyTopic, 1, handler, onSubscribeSuccess, 60)
			if (!webRtcPeer) {
				console.log("inside if");
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
		}
	}

	var viewerConnectHandler = function(result) {
		if (result.failed()) {
			console.log("InstaMsg not able to connect.");
		} else {
			console.log("InstaMsg socket connected.");
			instaMsg.subscribe(mediaReplyTopic, 1, handler,
					onSubscribeSuccess, 60)
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
		}
	}

	var disConnectHandler = function(result) {
		console.log("Connection lost with InstaMsg.")
	}

	var oneToOneMessageHandler = function() {
		console.log("This is a reply to a one to one message.")
	}

	var options = {
		logLevel : true,
		enableSsl : false
	}


	this.presenter = function(){
		instaMsg = instamsg.InstaMsg(ClientId, AuthKey, connectHandler,
				disConnectHandler, oneToOneMessageHandler, options)
	};

	this.viewer = function(){
		instaMsg = instamsg.InstaMsg(ClientId, AuthKey, viewerConnectHandler,
				disConnectHandler, oneToOneMessageHandler, options)
	};

	this.stop = function(){
		var message = {
				type : '3',
				to : ClientId,
				from : getClientId,
				stream_id : streamId,
		}
		sendInstaMessage(message);
	};
	
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
			to : ClientId,
			sdp_offer : offerSdp,
			from : ClientId,
			protocol : 'webrtc',
			type : '7',
			stream_id : streamId,
			record : true
		};
		sendInstaMessage(message);
	}

	var onOfferViewer = function (error, offerSdp) {
		if (error)
			return console.error('Error generating the offer');
		// console.log('Invoking SDP offer callback function ' + location.host);
		var message = {
			to : ClientId,
			sdp_offer : offerSdp,
			from : getClientId,
			protocol : 'webrtc',
			type : '9',
			stream_id : streamId,
			record : true
		};
		sendInstaMessage(message);
	}

	var onIceCandidate = function (candidate) {
		console.log("Local candidate" + JSON.stringify(candidate));

		var message = {
			type : '15',
			to : ClientId,
			from : getClientId,
			stream_id : streamId,
			candidate : JSON.stringify(candidate)
		};
		sendInstaMessage(message);;
	}

	var dispose = function () {
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;
		}
		hideSpinner(video);
	};

	var sendInstaMessage = function (message) {
		var jsonMessage = JSON.stringify(message);
		console.log('Sending message: ' + jsonMessage);
		instaMsg.publish(mediaSendTopic,jsonMessage, 1, 0)
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
