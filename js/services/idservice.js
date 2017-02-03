module.exports = {
  name: "IdService",
  func: function($http){
    let standId = "";
    const standInfo = [];
    const climate = [];
    const supply = [];

    return {
      postName: function(name){
        console.log("posting");
          $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
            "stand_name": "name",
        }).then(function(response){
          console.log(response.data);
          standId = response.data.stand_id;
          console.log(standId);
        });

        console.log("posted");
        return standId;
      },


      getStand: function(id){
        let stand = $http.get('https://blooming-hamlet-70507.herokuapp.com/stand' + standId).then(function (response) {
          const incoming = response.data;
          console.log(incoming);
          angular.copy(response.data, standInfo);
        });
        console.log(standInfo);
        return standInfo;
      },
      getWeather: function(){
        let weather = $http.get('https://blooming-hamlet-70507.herokuapp.com/weather/forecast').then(function (response) {
          const incoming = response.data;
          console.log(incoming);
          angular.copy(response.data, climate);
        });
        console.log(climate);
        return climate;
      },
      setPrice: function(price){
        standInfo.business.price = price;
        return standInfo;
      },
      buyIt: function(item, quantity){
        let ingredients = standInfo.ingredients;
        for (let i = 0; i < ingredients.length; i++) {
          let stockItem = ingredients[i];
          if (stockItem.label === item) {
            stockItem.value = quantity;
          }
          supply.push(ingredients[i]);
        console.log(supply);
        return supply;
        }
      },
    }
  }
}
