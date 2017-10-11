angular
.module('LeagueApp')
.controller('LeaguesIndexCtrl', LeaguesIndexCtrl);

LeaguesIndexCtrl.$inject =['$http', 'League', 'filterFilter', '$rootScope'];

function LeaguesIndexCtrl($http, League, filterFilter, $rootScope) {

  const vm = this;
  $rootScope.$broadcast('leagueIndex');

  vm.showSearch = true;

  League.query()
  .$promise
  .then((a)=>{
    vm.leagues = a;
  });

  vm.filter = function(){
    const params = { title: vm.q };
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
    vm.filtered = vm.leagues;
    vm.searching = true;
    League.query()
    .$promise
    .then((a)=>{
      vm.leagues = a;
      vm.filtered = vm.leagues;
    });
  };
}
