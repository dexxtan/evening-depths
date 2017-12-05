const upDownVoteApp = angular.module('upDownVoteApp', []);
const topics = [];

upDownVoteApp.controller('UpDownVoteController', function UpDownVoteController($scope) {
  $scope.newTopic = '';
  $scope.topics = topics;
  const initialUpVoteScore = 0;
  const initialDownVoteScore = 0;
  const initialTopicScore = initialUpVoteScore - initialDownVoteScore;
  let topicCounter = 0;

  $scope.addNewTopic = function(newTopicName) {
    const topic = {
      id: topicCounter,
      name: newTopicName,
      upvotes: initialUpVoteScore,
      downvotes: initialDownVoteScore,
      score: initialTopicScore
    };

    topicCounter++;

    $scope.topics.push(topic);
    $scope.newTopic = '';
  }
});

upDownVoteApp.directive('votableTopic', function votableTopic() {
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
