(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('LemonadeShackApp', ['ui.router']); //always create app first



const controllers = [
  require('./controllers/createstand'),
  require('./controllers/highscores'),
  require('./controllers/standmgr'),
];

for (let i = 0; i < controllers.length; i++) {
  console.log(controllers[i]);
  app.controller(controllers[i].name, controllers[i].func);
};

const services = [
  require('./services/idservice'),
  require('./services/highscoresservice')
];

for (let i = 0; i < services.length; i++) {
  console.log(services[i]);
  app.factory(services[i].name, services[i].func)
};

// app.config(function ($stateProvider) {
//     // $stateProvider is the object we add routes ('states') to.
//     $stateProvider.state({
//         name: 'start-game',
//         url: '/home',
//         component: 'createStand',
//     });
//
//     $stateProvider.state({
//         name: 'stand-manager',
//         url: '/stand',
//         component: 'standManager',
//     });
//
//     $stateProvider.state({
//         name: 'scores',
//         url: '/scores',
//         component: 'showScores',
//     });
//
// });
//
// /* Defining a component */
// app.component('createStand', {
//     controller: 'CreateStandController',
//     templateUrl: 'templates/create.html',
// });
//
// app.component('standManager', {
//     controller: 'StandManagerController',
//     templateUrl: 'templates/stand.html',
// });
//
// app.component('showScores', {
//     controller: 'HighscoresController',
//     templateUrl: 'templates/scores.html',
// });

},{"./controllers/createstand":2,"./controllers/highscores":3,"./controllers/standmgr":4,"./services/highscoresservice":5,"./services/idservice":6}],2:[function(require,module,exports){
module.exports = {
  name: "CreateStandController",

  func: function($scope, IdService){
    $scope.postName = function(name){
      let id = IdService.postName(name);
      console.log("created stand");
    }
  },
}

},{}],3:[function(require,module,exports){
module.exports = {
  name: "HighscoresController",
  func: function($scope, HighScoresService){
    $scope.scores = HighScoresService.getScores();
  },
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
        getStand(standId)
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

},{}]},{},[1]);
