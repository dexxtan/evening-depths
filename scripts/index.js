const upDownVoteApp = angular.module('upDownVoteApp', []);

upDownVoteApp.controller('UpDownVoteController', function UpDownVoteController($scope, topicService) {
  $scope.newTopic = '';
  $scope.topics = topicService.getTopics();

  $scope.addNewTopic = function(newTopicName) {
    topicService.addTopic(newTopicName);
    $scope.newTopic = '';
  }
});

angular.module('upDownVoteApp').directive('votableTopic', function votableTopic() {
  return {
    restrict: 'E',
    scope: {
      topic: '=data'
    },
    template: '<div>{{topic.score}} <input type="button" value="Up" ng-click="upvote()"><input type="button" value="Down" ng-click="downvote()"> {{topic.name}}</div>',
    controller: ['$scope', function VotableTopicController($scope) {
      $scope.upvote = function() {
        $scope.topic.upvotes++;
        recalculateScore($scope.topic);
      }

      $scope.downvote = function() {
        $scope.topic.downvotes++;
        recalculateScore($scope.topic);
      }

      function recalculateScore(topic) {
        topic.score = topic.upvotes - topic.downvotes;
      }
    }]
  }
});

angular.module('upDownVoteApp').factory('topicService', function() {
  const topics = [];
  let topicCounter = 0;
  const initialUpVoteScore = 0;
  const initialDownVoteScore = 0;
  const initialTopicScore = initialUpVoteScore - initialDownVoteScore;

  return {
    getTopics: function() {
      return topics;
    },
    addTopic: function(topicName) {
      const topic = {
        id: topicCounter,
        name: topicName,
        upvotes: initialUpVoteScore,
        downvotes: initialDownVoteScore,
        score: initialTopicScore
      };

      topicCounter++;

      topics.push(topic);
    }
  }
});