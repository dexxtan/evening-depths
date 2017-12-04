const upDownVoteApp = angular.module('upDownVoteApp', []);
const topics = [];

upDownVoteApp.controller('UpDownVoteController', function UpDownVoteController($scope) {
  $scope.newTopic = '';
  $scope.topics = topics;
  const topicsHash = {};
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

    topicsHash[topic.id] = topic;
    topicCounter++;

    $scope.topics.push(topic);
    $scope.newTopic = '';
  }
});
