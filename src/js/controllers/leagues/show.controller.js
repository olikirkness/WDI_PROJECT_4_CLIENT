angular
.module('LeagueApp')
.controller('LeagueShowCtrl', LeagueShowCtrl);

LeagueShowCtrl.$inject =['League', '$stateParams', 'Match'];

function LeagueShowCtrl( League, $stateParams, Match) {

  const vm = this;

  vm.league = League.get({id: $stateParams.id});
  vm.allMatches = Match.query();
  vm.allMatches
  .$promise
  .then((allMatches)=>{
    for (var i = 0; i < allMatches.length; i++) {
      if (allMatches[i].league.id === parseInt($stateParams.id)) {
        vm.matches.push(allMatches[i]);
      }
      console.log(allMatches[i].league.id, $stateParams.id);
      console.log(vm.matches);

    }

  });
  vm.matches = [];
  console.log(vm.allMatches);


  console.log(vm.league);
}
