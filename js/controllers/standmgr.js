module.exports = {
  name: "StandManagerController",
  func: function($scope, IdService){
    $scope.getStats =  IdService.getStand()
    $scope.weather = IdService.getWeather()
    $scope.setPrice = function(price){
      IdService.setPrice(price);
    }

    $scope.buyit = function(item, quantity){
      IdService.buyIt(item, quantity);
    }

  },
}
