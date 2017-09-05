angular
.module('LeagueApp')
.controller('LeaguesIndexCtrl', LeaguesIndexCtrl);

LeaguesIndexCtrl.$inject =['$http', 'League', 'filterFilter', '$rootScope'];

function LeaguesIndexCtrl($http, League, filterFilter, $rootScope) {

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
  $rootScope.$on('search', ()=>{
    vm.startSearch();
  });
  $rootScope.$on('stopSearch', ()=>{
    vm.searching = false;
    vm.filtered = [];
  });
  vm.startSearch = function(){
    vm.searching = true;
    vm.filtered = vm.leagues;
  };
}
