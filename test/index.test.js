describe('upDownVoteApp', function() {
  let $rootScope;

  beforeEach(module('upDownVoteApp'));

  describe('UpDownVoteController', function() {
    let $controller;
    let $scope;
    let topicServiceMock;

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;

      topicServiceMock = {
        addTopic: function() {},
        getTopics: function() {}
      };
      spyOn(topicServiceMock, 'getTopics');

      $scope = $rootScope.$new();
      $controller('UpDownVoteController', { $scope: $scope, topicService: topicServiceMock });
    }));

    describe('init', function() {
      it('sets $scope.newTopic to an empty string', function() {
        expect($scope.newTopic).toEqual('');
      });

      it('calls topicService to get a list of topics', function() {
        expect(topicServiceMock.getTopics).toHaveBeenCalled();
      });
    });

    describe('addNewTopic', function() {
      it('should call topicService to addTopic', function() {
        const topicName = 'testTopic';
        spyOn(topicServiceMock, 'addTopic');
        $scope.newTopic = topicName;
        $scope.addNewTopic($scope.newTopic);
        expect(topicServiceMock.addTopic).toHaveBeenCalledWith(topicName);
        expect($scope.newTopic).toEqual('');
      });
    });
  });

  describe('votableTopic directive', function() {
    let $compile;
    let $scope;
    let topic;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      topic = {
        id: 0,
        name: 'directiveTestTopic',
        upvotes: 0,
        downvotes: 0,
        score: 0
      };
      $scope = $rootScope.$new();
      $scope.topic = topic;
    }));

    it('compiles into an expected state', function() {
      let element = $compile('<votable-topic data="topic"></votable-topic>')($scope);
      $scope.$digest();

      expect(element.html()).toContain('0 <input type="button" value="Up" ng-click="upvote()"><input type="button" value="Down" ng-click="downvote()"> directiveTestTopic');
    });

    it('increments score when upvote is called', function() {
      let element = $compile('<votable-topic data="topic"></votable-topic>')($scope);
      let isolatedScope = element.isolateScope();
      isolatedScope.upvote();
      $scope.$digest();

      expect(element.html()).toContain('1 <input type="button" value="Up" ng-click="upvote()"><input type="button" value="Down" ng-click="downvote()"> directiveTestTopic');
    });

    it('decrements score when downvote is called', function() {
      let element = $compile('<votable-topic data="topic"></votable-topic>')($scope);
      let isolatedScope = element.isolateScope();
      isolatedScope.downvote();
      $scope.$digest();

      expect(element.html()).toContain('-1 <input type="button" value="Up" ng-click="upvote()"><input type="button" value="Down" ng-click="downvote()"> directiveTestTopic');
    });
  });

  describe('topicService', function() {
    let topicService;

    beforeEach(inject(function(_topicService_) {
      topicService = _topicService_;
    }));

    describe('getTopics', function() {
      it('should return an array of topics', function() {
        let topics = topicService.getTopics();

        expect(topics instanceof Array).toBe(true);
        expect(topics.length).toEqual(0);
      });
    });

    describe('addTopic', function() {
      it('should add a new topic to the array of topics', function() {
        const topicName = 'testTopic';
        topicService.addTopic(topicName);
        let topics = topicService.getTopics();
        expect(topics.length).toEqual(1);
        expect(topics[0].id).toEqual(0);
        expect(topics[0].name).toEqual(topicName);
        expect(topics[0].upvotes).toEqual(0);
        expect(topics[0].downvotes).toEqual(0);
        expect(topics[0].score).toEqual(0);
      });

      it('should increment id when more topics are added', function() {
        const topicName = 'testTopic';
        topicService.addTopic(topicName);
        let topics = topicService.getTopics();
        expect(topics.length).toEqual(1);
        expect(topics[0].id).toEqual(0);

        topicService.addTopic(topicName);
        expect(topics.length).toEqual(2);
        expect(topics[1].id).toEqual(1);
      });
    });
  });
});
