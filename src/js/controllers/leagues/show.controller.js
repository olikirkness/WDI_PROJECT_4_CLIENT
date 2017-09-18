angular
.module('LeagueApp')
.controller('LeagueShowCtrl', LeagueShowCtrl);

LeagueShowCtrl.$inject =['League', '$stateParams', 'Match', '$rootScope', 'Challenge', 'CurrentUserService', 'Comment', '$state'];

function LeagueShowCtrl( League, $stateParams, Match, $rootScope, Challenge, CurrentUserService, Comment, $state) {

  const vm = this;
  $rootScope.$broadcast('notLeagueIndex');
  CurrentUserService.getUser();

  vm.league = League.get({id: $stateParams.id});
  $rootScope.$on('addedToLeague', ()=>{
    vm.league = League.get({id: $stateParams.id});

  });
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
  // vm.checkSent();
  // vm.checkRecieved();
  // vm.checkUnplayed();
  vm.updateState = function(){
    CurrentUserService.getUser();
    vm.user = CurrentUserService.currentUser;
  };
  vm.updateState();

  vm.indexClicked = [];
  vm.challenge = function(e, i){

    Challenge.save({challenge: {
      sender_id: CurrentUserService.currentUser.id,
      reciever_id: e,
      league_id: vm.league.id
    }});
    vm.indexClicked.push(i);
    // // vm.clicked = true;
    // vm.trophies.splice(i, 1);
    // vm.updateState();
    // console.log(vm.trophies);
  };
  vm.trophies = [];

  vm.setSelected = function(){
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

  vm.leaveLeague = function(userId){
    vm.user_ids = [];
    for (var i = 0; i < vm.league.users.length; i++) {
      if (vm.league.users[i].id === userId) {
        console.log('MATCH');
        vm.league.users.splice(i, 1);
      }else{
        vm.user_ids.push(vm.league.users[i].id);
        console.log(vm.user_ids);
      }
    }
    vm.userUpdate();
  };

  vm.userUpdate = function(){
    for (var i = 0; i < vm.user.leagues.length; i++) {
      if (vm.user.leagues[i].id === vm.league.id) {
        vm.user.leagues.splice(i,1);
      }
    }

    vm.league = {
      id: vm.league.id,
      user_ids: vm.user_ids
    };
    League
    .update({id: vm.league.id}, {league: vm.league})
    .$promise
    .then((league)=>{
      console.log(league, 'LEAGUE');
      $state.go('leaguesIndex');
    });
  };
  // vm.leagueUpdate = function(updatedLeague){
  //   League.update({id: updatedLeague.id}, {user: updatedLeague}).$promise.then((league)=>{
  //     console.log(league, 'LEAGUE');
  //     $state.go('leaguesIndex');
  //   });
  // };
}
