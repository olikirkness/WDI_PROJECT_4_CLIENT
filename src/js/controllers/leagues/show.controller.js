angular
.module('LeagueApp')
.controller('LeagueShowCtrl', LeagueShowCtrl);

LeagueShowCtrl.$inject =['League', '$stateParams', 'Match', '$rootScope', 'Challenge', 'CurrentUserService'];

function LeagueShowCtrl( League, $stateParams, Match, $rootScope, Challenge, CurrentUserService) {

  const vm = this;

  vm.league = League.get({id: $stateParams.id});
  $rootScope.$on('addedToLeague', ()=>{
    vm.league = League.get({id: $stateParams.id});
  });

  vm.allMatches = Match.query();
  vm.allMatches
  .$promise
  .then((allMatches)=>{
    for (var i = 0; i < allMatches.length; i++) {
      if (allMatches[i].league.id === parseInt($stateParams.id)) {
        vm.matches.push(allMatches[i]);
      }
    }
  });
  $rootScope.$on('matchSubmitted', ()=>{
    vm.allMatches = Match.query();
    vm.allMatches
    .$promise
    .then((allMatches)=>{
      for (var i = 0; i < allMatches.length; i++) {
        if (allMatches[i].league.id === parseInt($stateParams.id)) {
          vm.matches.push(allMatches[i]);
        }
      }
    });
  });


  vm.challenge = function(e){
    console.log('CHALLENGE', e);
    Challenge.save({challenge: {
      sender_id: CurrentUserService.currentUser.id,
      reciever_id: e,
      league_id: vm.league.id
    }}).$promise.then((c)=>{
      console.log(c);
    });
  };


  vm.matches = [];
}
