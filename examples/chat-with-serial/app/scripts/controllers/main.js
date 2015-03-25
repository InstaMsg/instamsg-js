'use strict';

/**
 * @ngdoc function
 * @name chatWithSerialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatWithSerialApp
 */
angular.module('chatWithSerialApp')
//    .directive('addMsg', ['$rootScope', '$compile', function ($root, $compile) {
//        var receivedMsg = '<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "> </div><div class="messages msg_receive"><p>{{content.msg}}</p><time datetime="2009-11-13T20:00">Timothy • 51 min</time></div></div>';
//        var sentMsg = '<div class="row msg_container base_sent"><div class="messages msg_sent"><p>{{content.msg}}</p> <time datetime="2009-11-13T20:00">Timothy • 51 min</time></div><div class="col-md-2 col-xs-2 avatar"><img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div></div>';
//
//        var getTemplate = function(contentType) {
//            var template = '';
//
//            switch(contentType) {
//                case 'received':
//                    template = receivedMsg;
//                    break;
//                case 'sent':
//                    template = sentMsg;
//                    break;
//            }
//            return template;
//        }
//
//        var linker = function(scope, element, attrs) {
//            scope.$parent.$watch(scope.content, function(_new, _old) {
//                console.log(_new)
//                console.log(_old)
//                })
//            element.html(getTemplate(scope.content.content_type)).show();
//
//            $compile(element.contents())(scope);
//        }
//
//        return {
////            restrict: "E",
//            link: linker,
//            scope: {
//                content:'='
//            }
//        };
//}])
    .factory('Connection', function ($rootScope) {
        var connectHandler = function (result) {
            if (result.succeeded()) {
                $rootScope.$broadcast('connected', {})
            } else {
                alert(result.cause());
            }
        }

        var disConnectHandler = function () {
            $rootScope.$broadcast('disConnected', {})
        }

        var oneToOneMessageHandler = function (msg) {
            $rootScope.$broadcast("msgArrived", msg);
        }
        var connect = function (client) {
            var options = {enableSsl: true}
            try {
                $rootScope.instaMsg = instamsg.InstaMsg(client.id, client.secret, connectHandler, disConnectHandler, oneToOneMessageHandler)
            } catch (e) {
                console.log(e)
            }

        }
        return {
            connect: function (client) {
                connect(client);
            }
        };
    }).controller('connectCtrl', function ($scope, Connection, $rootScope) {
        var original;
        original = angular.copy($scope.client);
        $scope.canSubmit = function () {
            return $scope.connect_form.$valid && !angular.equals($scope.client, original);
        };
        $scope.connected = false;
        $rootScope.$on('connected', function () {
            $scope.$apply(function () {
                $scope.connected = true;
            })
            alert("InstaMsg socket connected.")
        })

        $rootScope.$on('disConnected', function () {
            $scope.connected = false;
            alert("Connection lost with InstaMsg.")
        })

        $scope.connectToInstaMsg = function (client) {
            $rootScope.client = client
            Connection.connect(client)
        }

        $scope.closeConnection = function () {
            $rootScope.instaMsg.close()
        }
    }).controller('msgCtrl', function ($scope, $rootScope) {
        var original;
        original = angular.copy($scope.msg);

        $scope.canSubmit = function () {
            return $scope.publish_form.$valid && !angular.equals($scope.msg, original);
        };

        function toHex(str) {
            var hex = '';
            for (var i = 0; i < str.length; i++) {
                hex += '' + str.charCodeAt(i).toString(16);
            }
            return hex;
        }

        $scope.msgs = []

        var msgArrived = function (msg) {
            var content = "reply of msg"
            $scope.partner = msg.replyTopic();
            $scope.lastmsg = msg
            var a = {"content_type": "received", "msg": msg.body(), "time": new Date()}
            $scope.$apply(function () {
                $scope.msgs.push(a)
                console.log($scope.msgs)
            })
        }

        var replyHandler = function (msg) {
            console.log("reply of msg arrived")
            msgArrived(msg)
        }

        var resultHandler = function (obj) {
            console.log(obj)
            console.log("Message published.")
            var json = JSON.parse(obj.payloadString);
            $scope.partner = json.topic;
            var a = {"content_type": "sent", "msg": json.body, "time": new Date()}
            $scope.$apply(function () {
                $scope.msgs.push(a)
            })
        }

        $scope.send = function (msg) {

            if ($rootScope.instaMsg) {
                $rootScope.instaMsg.send(msg.topic, msg.message, 1, replyHandler, resultHandler, 100)
            } else {
                alert("InstaMsg socket is not connected.")
            }
        }

        var resulthandler = function (msg) {
            console.log("reply of msg deliverd")
        }

        $rootScope.$on("msgArrived", function (event, msg) {
            msgArrived(msg)
        })

        $scope.msgReply = function (content) {
            var a = {"content_type": "sent", "msg": content, "time": new Date() }
            $scope.msgs.push(a)
            $scope.data = ''
            $rootScope.instaMsg.reply(content, $scope.lastmsg, 0, replyHandler, resulthandler, 100)
        };

        $rootScope.$on('disConnected', function () {
            $scope.partner = '';
        })
    });