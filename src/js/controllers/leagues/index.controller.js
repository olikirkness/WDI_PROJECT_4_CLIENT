angular
.module('LeagueApp')
.controller('LeaguesIndexCtrl', LeaguesIndexCtrl);

LeaguesIndexCtrl.$inject =['$http', 'League', 'filterFilter'];

function LeaguesIndexCtrl($http, League, filterFilter) {

  const vm = this;


  League.query()
  .$promise
  .then((a)=>{
    vm.leagues = a;
    // vm.filtered = vm.leagues;
  });

  vm.filter = function(){
    const params = { title: vm.q };
    // vm.filtered = vm.leagues;
    if(vm.q){
      vm.filtered = filterFilter(vm.leagues, params);
    }else{
      vm.filtered = vm.leagues;
    }
  };
  vm.searching = false;
  vm.filtered = false;
  vm.startSearch = function(){
    vm.searching = true;
    vm.filtered = vm.leagues;
  };
}
