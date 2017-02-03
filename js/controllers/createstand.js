module.exports = {
  name: "CreateStandController",

  func: function($scope, IdService){
    $scope.postName = function(name){
      let id = IdService.postName(name);
      console.log("created stand");
    }
  },
}
