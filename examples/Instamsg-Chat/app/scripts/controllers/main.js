'use strict';

/**
 * @ngdoc function
 * @name chatWithSerialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatWithSerialApp
 */
angular.module('chatWithSerialApp')
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
    }).controller('sendMsgCtrl', function ($scope, $rootScope) {
        var original;
        original = angular.copy($scope.msg);

        $scope.canSubmit = function () {
            return $scope.publish_form.$valid && !angular.equals($scope.msg, original);
        };

        $scope.msgs = []

        var replyHandler = function (msg) {
            $rootScope.$broadcast('replyArrived', msg)
        }

        var resultHandler = function (obj) {
            var json = JSON.parse(obj.payloadString);
            $scope.partner = json.topic;
            var msg = {"content_type": "sent", "msg": json.body, "time": new Date()}
            $rootScope.$broadcast('msgPublished', msg)
        }

        $scope.send = function (msg) {

            if ($rootScope.instaMsg) {
                $rootScope.instaMsg.send(msg.topic, msg.message, 1, replyHandler, resultHandler, 100)
            } else {
                alert("InstaMsg socket is not connected.")
            }
        }
    }).controller('msgCtrl', function ($scope, $rootScope) {
        $scope.msgs = []

        $rootScope.$on("msgPublished", function (event, msg) {
            $scope.msgs.push(msg)
        })

        var msgArrived = function (msg) {
            var content = "reply of msg"
            $scope.partner = msg.replyTopic();
            $scope.lastmsg = msg
            var a = {"content_type": "received", "msg": msg.body(), "time": new Date()}
            $scope.$apply(function () {
                $scope.msgs.push(a)
            })
        }
        $rootScope.$on("replyArrived", function (event, msg) {
            msgArrived(msg)
        })

        var resulthandler = function (msg) {
//            console.log("reply of msg deliverd")
        }

        $rootScope.$on("msgArrived", function (event, msg) {
            msgArrived(msg)
        })

        var replyHandler = function (msg) {
            msgArrived( msg)
        }
        $scope.msgReply = function (content) {
            var a = {"content_type": "sent", "msg": content, "time": new Date() }
            $scope.msgs.push(a)
            $scope.data = ''
            $rootScope.instaMsg.send($scope.partner, content, 1, replyHandler, resulthandler, 100)
        };

        $rootScope.$on('disConnected', function () {
            $scope.partner = '';
        })
    });