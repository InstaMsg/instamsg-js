'use strict';

/**
 * @ngdoc function
 * @name chatWithSerialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatWithSerialApp
 */
angular.module('chatWithSerialApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
