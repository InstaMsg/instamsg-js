'use strict';

/**
 * @ngdoc overview
 * @name chatWithSerialApp
 * @description
 * # chatWithSerialApp
 *
 * Main module of the application.
 */
angular
  .module('chatWithSerialApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'connectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
