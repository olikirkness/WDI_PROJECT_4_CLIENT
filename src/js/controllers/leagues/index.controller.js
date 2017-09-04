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
  vm.requestSent = false;
  vm.request = function(a,b, c){
    vm.requestObj = {
      sender_id: a,
      league_id: b,
      reciever_id: c
    };
    vm.requestSent = true;
    Request
    .save({request: vm.requestObj})
    .$promise
    .then((req)=>{
      console.log(req);
    });
  };

  vm.ave = [];
  vm.findAve = function(leagues){
    console.log(leagues, 'LEAGUE ID');
    // Us.get({id: leagueId}).$promise.then((e) =>{
    //   console.log(e);
      // vm.total = 0;
      // for (var i = 0; i < e.users.length; i++) {
      //   vm.total = vm.total + e.users[i].ranking;
      // }
      // vm.ave.push(vm.total/vm.users.length);
    //   // console.log(vm.ave);
    // });
  };

}
