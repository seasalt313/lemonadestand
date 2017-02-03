module.exports = {
  name: "HighscoresController",
  func: function($scope, HighScoresService){
    $scope.scores = HighScoresService.getScores();
  },
}
