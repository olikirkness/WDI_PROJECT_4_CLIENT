angular
.module('LeagueApp')
.controller('LeaguesIndexCtrl', LeaguesIndexCtrl);

LeaguesIndexCtrl.$inject =['$http', 'League'];

function LeaguesIndexCtrl($http, League) {

  const vm = this;

  vm.leagues = League.query();
  vm.leagues
  .$promise
  .then((a)=>{
    vm.leagues = a;
  });

}
