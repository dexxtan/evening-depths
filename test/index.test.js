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

    it('sets $scope.topics to be an empty array', function() {
      let $scope = $rootScope.$new();
      let controller = $controller('UpDownVoteController', { $scope: $scope });
      expect($scope.topics instanceof Array).toBe(true);
      expect($scope.topics.length).toEqual(0);
    });
  });

  describe('addNewTopic', function() {
    it('adds a new topic to $scope.topics with the correct values', function() {
      const topicName = 'testTopic1';
      let $scope = $rootScope.$new();
      let controller = $controller('UpDownVoteController', { $scope: $scope });
      $scope.newTopic = topicName;
      $scope.addNewTopic(topicName);
      expect($scope.topics.length).toEqual(1);
      expect($scope.topics[0].id).toEqual(0);
      expect($scope.topics[0].name).toEqual(topicName);
      expect($scope.topics[0].upvotes).toEqual(0);
      expect($scope.topics[0].downvotes).toEqual(0);
      expect($scope.topics[0].score).toEqual(0);
      expect($scope.newTopic).toEqual('');
    });
  });
});
