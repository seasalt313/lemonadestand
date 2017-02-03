module.exports = {
  name: "HighScoresService",
  func: function($http){
    const scores = [];

    return {
      getScores: function(){
        let results = $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top').then(function (response) {
            angular.copy(response.data, scores);
        });
        return scores;
      },
    }
  }
}
