angular
.module('LeagueApp')
.controller('LeagueShowCtrl', LeagueShowCtrl);

LeagueShowCtrl.$inject =['League', '$stateParams', 'Match', '$rootScope', 'Challenge', 'CurrentUserService', 'Comment'];

function LeagueShowCtrl( League, $stateParams, Match, $rootScope, Challenge, CurrentUserService, Comment) {

  const vm = this;
  CurrentUserService.getUser();

  vm.league = League.get({id: $stateParams.id});
  console.log(vm.league);
  $rootScope.$on('addedToLeague', ()=>{
    vm.league = League.get({id: $stateParams.id});

  });
  // console.log(vm.league);
  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
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

    vm.checkSent();
    vm.checkRecieved();
    vm.checkUnplayed();
  });
  vm.updateState = function(){
    CurrentUserService.getUser();
  };
  vm.updateState();


  vm.challenge = function(e){
    vm.updateState();
    // vm.clicked = true;
    Challenge.save({challenge: {
      sender_id: CurrentUserService.currentUser.id,
      reciever_id: e,
      league_id: vm.league.id
    }});
  };


  vm.setSelected = function(){
    console.log('LOGGED');
    vm.selected = !vm.selected;
  };

  vm.submitComment = function(){
    vm.comment.league_id = $stateParams.id;
    vm.comment.sender_id = vm.user.id;
    Comment.save({comment: vm.comment}).$promise.then(()=> {
      vm.user = CurrentUserService.currentUser;
      vm.league = League.get({id: $stateParams.id}).$promise.then((league)=>{
        vm.league = league;
        vm.comment.body = '';
      });
    });
  };
}
