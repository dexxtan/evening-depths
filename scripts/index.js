const upDownVoteApp = angular.module('upDownVoteApp', []);

upDownVoteApp.controller('UpDownVoteController', function UpDownVoteController($scope, topicService) {
  $scope.newTopic = '';
  $scope.topics = topicService.getTopics();

  $scope.addNewTopic = function(newTopicName) {

    // the assumption here is that there will be no user who can add a topic with more than 255 words through any weird means
    // so no need to do an additional check for topic length here.
    topicService.addTopic(newTopicName);
    $scope.newTopic = '';
  }
});

// use a directive to handle upvotes and downvotes for each topic to keep the logic clean for looking up each topic for modification
// it may have to be more complicated when we try to keep the array of topics sorted
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

// use a service to handle logic for topics to keep the controller clean
angular.module('upDownVoteApp').factory('topicService', function() {

  // use array to store topics for the moment since we are only displaying the top 20 scored topics on the page, mostly to avoid premature optimization
  // ng-repeat with limitTo and orderBy topic score to sort at render time seems to be sufficient for the moment especially since data is reset each time the page is refreshed
  // if necessary we can start adding logic to keep the array sorted at all times after each upvote/downvote
  const topics = [];
  let topicCounter = 0;
  const initialUpVoteScore = 0;
  const initialDownVoteScore = 0;
  // the instruction was to sort the topics via upvotes descending
  // however i made the assumption that information was left out to include downvotes in the calculation for each topic's score
  const initialTopicScore = initialUpVoteScore - initialDownVoteScore;

  return {
    getTopics: function() {
      return topics;
    },
    addTopic: function(topicName) {

      // keep track of the number of upvotes and downvotes in case the calculation for the score changes away from a simple upvote minus downvote logic
      // id will come in handy when we have logic for keeping the array always sorted, since we will have to maintain a hashmap to access each topic for modification quickly
      const topic = {
        id: topicCounter,
        name: topicName,
        upvotes: initialUpVoteScore,
        downvotes: initialDownVoteScore,
        score: initialTopicScore
      };

      // ideally this would be an auto incremented column in some DB, but we do it manually here since there is no data persistence
      topicCounter++;

      topics.push(topic);
    }
  }
});