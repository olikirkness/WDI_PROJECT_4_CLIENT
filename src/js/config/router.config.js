angular
.module('LeagueApp')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('leaguesIndex', {
    url: '/leagues',
    templateUrl: '/js/views/leagues/index.html',
    controller: 'LeaguesIndexCtrl as vm'
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
;

  $urlRouterProvider.otherwise('/');
}
