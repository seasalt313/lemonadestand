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
