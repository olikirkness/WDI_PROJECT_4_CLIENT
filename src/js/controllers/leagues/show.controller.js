angular
.module('LeagueApp')
.controller('LeagueShowCtrl', LeagueShowCtrl);

LeagueShowCtrl.$inject =['League', '$stateParams', 'Match', '$rootScope', 'Challenge', 'CurrentUserService'];

function LeagueShowCtrl( League, $stateParams, Match, $rootScope, Challenge, CurrentUserService) {

  const vm = this;

  vm.league = League.get({id: $stateParams.id});
  console.log(vm.league);
  $rootScope.$on('addedToLeague', ()=>{
    vm.league = League.get({id: $stateParams.id});
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
  // vm.clicked = false;
  vm.challenge = function(e){
    // vm.clicked = true;
    Challenge.save({challenge: {
      sender_id: CurrentUserService.currentUser.id,
      reciever_id: e,
      league_id: vm.league.id
    }});
  };

  vm.sentChallengesInLeague = [];
  vm.recievedChallengesInLeague = [];
  vm.unplayedMatchesInLeague = [];

  vm.checkSent = function (){
    vm.user = CurrentUserService.currentUser;

    for (var i = 0; i < vm.user.sent_challenges.length; i++) {

      if(vm.league.id === vm.user.sent_challenges[i].league.id){
        vm.sentChallengesInLeague.push(vm.user.sent_challenges[i].reciever_id);
      }
    }

  };
  vm.checkRecieved = function (){
    vm.user = CurrentUserService.currentUser;

    for (var i = 0; i < vm.user.recieved_challenges.length; i++) {

      if(vm.league.id === vm.user.recieved_challenges[i].league.id){
        vm.recievedChallengesInLeague.push(vm.user.recieved_challenges[i].sender_id);
      }
    }

  };

  vm.checkUnplayed = function (){
    vm.user = CurrentUserService.currentUser;

    for (var i = 0; i < vm.user.matches.length; i++) {

      for (var a = 0; a < vm.user.matches[i].users.length; a++) {

        if (!vm.user.matches[i].played && vm.user.matches[i].league.id === vm.league.id) {

          vm.unplayedMatchesInLeague.push(vm.user.matches[i].users[a].id);

        }
      }
    }
  };


  // vm.player_one = User.get()

}
