angular
.module('LeagueApp')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('HomeCtrl', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl as vm'
  })
  .state('leaguesIndex', {
    url: '/leagues',
    templateUrl: '/js/views/leagues/index.html',
    controller: 'LeaguesIndexCtrl as vm'
  })
  .state('leaguesNew', {
    url: '/leagues/new',
    templateUrl: '/js/views/leagues/new.html',
    controller: 'LeagueNewCtrl as vm'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/authentications/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/authentications/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('leagueShow', {
    url: '/league/:id',
    templateUrl: '/js/views/leagues/show.html',
    controller: 'LeagueShowCtrl as vm'
  })
  .state('challengesIndex', {
    url: '/challenges',
    templateUrl: '/js/views/challenges/index.html',
    controller: 'ChallengeIndexCtrl as vm'
  })
  .state('matchSubmit', {
    url: '/challenges/:id',
    templateUrl: '/js/views/matches/submit.html',
    controller: 'MatchSubmitCtrl as vm'
  })
  .state('playerShow', {
    url: '/players/:id',
    templateUrl: '/js/views/players/show.html',
    controller: 'PlayerShowCtrl as vm'
  })
;

  $urlRouterProvider.otherwise('/');
}
