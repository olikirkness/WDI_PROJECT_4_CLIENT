angular
.module('LeagueApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', 'User', 'League', 'Request', 'Challenge', 'Match'];
function MainCtrl($rootScope, CurrentUserService, $state, User, League, Request, Challenge, Match) {
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    console.log(vm.user);
    vm.sentRequestIds = [];
    for (var i = 0; i < vm.user.sent_requests.length; i++) {
      vm.sentRequestIds.push(vm.user.sent_requests[i].league.id);
    }
    vm.joinedLeagues = [];
    for (var a = 0; a < vm.user.leagues.length; a++) {
      vm.joinedLeagues.push(vm.user.leagues[a].id);
    }
  });
  vm.count = 0;
  vm.startSearch = function(){
    vm.count++;
    if (vm.count%2 === 1) {
      $rootScope.$broadcast('search');
    }else{
      $rootScope.$broadcast('stopSearch');
    }

  };

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

  vm.addToLeague = function(userId, leagueId, obj, reqId){
    League.get({id: leagueId})
    .$promise
    .then((data)=>{

      vm.leagueToAdd = {
        id: data.id,
        title: data.title,
        image: data.image,
        user_ids: [],
        creator_id: data.creator.id
      };
      for (var i = 0; i < data.users.length; i++) {
        vm.leagueToAdd.user_ids.push(data.users[i].id);
      }
      vm.leagueToAdd.user_ids.push(userId);
      League
      .update({id: vm.leagueToAdd.id}, {league: vm.leagueToAdd})
      .$promise
      .then(()=>{
        vm.user.recieved_requests.splice(obj.$index, 1);
        vm.notifications.splice(obj.$index, 1);
        $rootScope.$broadcast('addedToLeague');
        Request
        .delete({id: reqId});
      });
    });
  };
  vm.addToMatches = function(userId, leagueId, obj, reqId){
    console.log(userId, leagueId, obj, reqId);
    vm.match = {
      score: [],
      played: false,
      league_id: leagueId,
      user_ids: [userId, vm.user.id]
    };

    Match.save({match: vm.match}).$promise.then(()=>{

      vm.user.recieved_challenges.splice(obj.$index, 1);
      vm.notifications.splice(obj.$index+vm.user.recieved_requests.length, 1);
      Challenge
      .delete({id: reqId});
      $rootScope.$broadcast('challengeAccepted');
    });
  };
  /////__________________________________________________________________________________
  vm.handleRequest = function(senderId, leagueId, recieverId){
    User.get({id: vm.user.id}).$promise.then((user)=>{
      vm.user = user;
      if(vm.sentRequestIds.includes(leagueId)){
        for (var i = 0; i < vm.user.sent_requests.length; i++) {
          if (vm.user.sent_requests[i].league.id === leagueId) {
            vm.removeRequestFromFilter(vm.user.sent_requests[i].id, leagueId);
            const index = vm.sentRequestIds.indexOf(leagueId);
            vm.sentRequestIds.splice(index, 1);
          }
        }
      }else{
        vm.sentRequestIds.push(leagueId);
        vm.request(senderId, leagueId, recieverId);
      }

    });
  };
  vm.removeRequestFromFilter = function(requestId, leagueId){
    vm.justClicked = '';
    console.log(leagueId, vm.sentRequestIds, 'DEEEEELLLLEEETTTTEEEEEE');
    Request.delete({id: requestId});
  };

  vm.request = function(a, b, c){
    vm.requestObj = {
      sender_id: a,
      league_id: b,
      reciever_id: c
    };
    vm.requestSent = true;
    Request
    .save({request: vm.requestObj})
    .$promise
    .then(()=>{

      // vm.sentRequestIds.push(b);
      console.log(vm.sentRequestIds, b, 'AAAAAAADDDDDDDDDDDDDDDDDD');
      vm.justClicked = b;
    });
  };

  ///////////////////////////////////////////////////////////////////////

  vm.deleteRequest = function(a, b){
    const index = a.$index;
    Request.delete({id: b});
    vm.user.recieved_requests.splice(index, 1);
    vm.notifications.splice(index, 1);
  };

  vm.deleteChallenge = function(a, b){
    const index = a.$index;
    Challenge.delete({id: b});
    vm.user.recieved_challenges.splice(index, 1);
    vm.notifications.splice(index+vm.user.recieved_requests.length, 1);
  };


  vm.updateUser = function(e){
    const index = e;
    $rootScope.$on('matchSubmitted', ()=>{
      console.log(index);
      vm.user.matches.splice(index, 1);
    });
  };
}
