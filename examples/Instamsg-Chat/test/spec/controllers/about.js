'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
<<<<<<< HEAD
  beforeEach(module('adminApp'));
=======
  beforeEach(module('ioeyeUiApp'));
>>>>>>> 3a7bf0ef11dc64f55503dd17e8a02aab4588ee9f

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
