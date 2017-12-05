describe('UpDownVoteController', function() {
  beforeEach(module('upDownVoteApp'));

  let $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('init', function() {
    it('sets $scope.newTopic to an empty string', function() {
      let $scope = $rootScope.$new();
      let controller = $controller('UpDownVoteController', { $scope: $scope });
      expect($scope.newTopic).toEqual('');
    });
  });
});
