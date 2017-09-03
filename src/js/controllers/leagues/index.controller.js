angular
.module('LeagueApp')
.controller('LeaguesIndexCtrl', LeaguesIndexCtrl);

LeaguesIndexCtrl.$inject =['$http', 'League', 'filterFilter', 'Request'];

function LeaguesIndexCtrl($http, League, filterFilter, Request) {

  const vm = this;

  vm.leagues = League.query();
  vm.leagues
  .$promise
  .then((a)=>{
    vm.leagues = a;
  });

  vm.filter = function(){
    const params = { title: vm.q };
    vm.filtered = filterFilter(vm.leagues, params);
  };

  vm.request = function(a,b, c){
    vm.requestObj = {
      sender_id: a,
      league_id: b,
      reciever_id: c
    };
    Request
    .save({request: vm.requestObj})
    .$promise
    .then((req)=>{
      console.log(req);
    });
  };

}
