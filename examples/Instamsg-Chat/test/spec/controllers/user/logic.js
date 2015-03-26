'use strict';

describe('Controller: UserLogicctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('ioeyeUiApp'));

  var UserLogicctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserLogicctrlCtrl = $controller('UserLogicctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
