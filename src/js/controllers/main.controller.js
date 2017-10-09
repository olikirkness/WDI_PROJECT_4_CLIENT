angular
.module('LeagueApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', 'User', 'League', 'Request', 'Challenge', 'Match'];
function MainCtrl($rootScope, CurrentUserService, $state, User, League, Request, Challenge, Match) {
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    vm.sentRequestIds = [];
    for (var i = 0; i < vm.user.sent_requests.length; i++) {
      vm.sentRequestIds.push(vm.user.sent_requests[i].league.id);
    }
    vm.joinedLeagues = [];
    for (var a = 0; a < vm.user.leagues.length; a++) {
      vm.joinedLeagues.push(vm.user.leagues[a].id);
    }
    vm.challngesCount = 0;
    vm.countChallenges = function (){

      for (var i = 0; i < vm.user.matches.length; i++) {
        if (!vm.user.matches[i].played) {
          vm.challngesCount++;
        }
      }
    };
    vm.sortNotifications();
    vm.countChallenges();
  });
  vm.sortNotifications = function () {
    vm.user = CurrentUserService.currentUser;
    vm.notifications = [];
    for (var i = 0; i < vm.user.recieved_requests.length; i++) {
      vm.notifications.push({
        $index: i,
        type: 'request',
        sender_id: vm.user.recieved_requests[i].sender.id,
        league_id: vm.user.recieved_requests[i].league.id,
        id: vm.user.recieved_requests[i].id,
        date: vm.user.recieved_requests[i].created_at,
        user: vm.user.recieved_requests[i].sender.username,
        message: `${vm.user.recieved_requests[i].sender.username} wants to join ${vm.user.recieved_requests[i].league.title}`
      });
    }
    for (var a = 0; a < vm.user.recieved_challenges.length; a++) {
      vm.notifications.push({
        $index: i + a,
        type: 'challenge',
        sender_id: vm.user.recieved_challenges[a].sender.id,
        league_id: vm.user.recieved_challenges[a].league.id,
        id: vm.user.recieved_challenges[a].id,
        date: vm.user.recieved_challenges[a].created_at,
        user: vm.user.recieved_challenges[a].sender.username,
        message: `${vm.user.recieved_challenges[a].sender.username} wants to challenge you in ${vm.user.recieved_challenges[a].league.title}`
      });
    }
  };

  $rootScope.$on('leagueIndex', ()=>{
    vm.showSearch = true;
  });
  $rootScope.$on('notLeagueIndex', ()=>{
    vm.showSearch = false;
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
    $state.go('HomeCtrl');
  });

  $rootScope.$on('Home', () => {
    vm.home = true;
  });
  $rootScope.$on('notHome', () => {
    vm.home = false;
  });


  vm.logout = () => {
    CurrentUserService.removeUser();
    $rootScope.$broadcast('Home');
  };

  vm.addToLeague = function(userId, leagueId, obj, reqId){
    vm.notifications.splice(vm.notifications.indexOf(obj), 1);
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
        Request
        .delete({id: reqId});
        CurrentUserService.getUser();
        $rootScope.$on('loggedIn', ()=>{
          vm.user = CurrentUserService.currentUser;
        });

      });
    });
  };
  vm.addToMatches = function(userId, leagueId, obj, reqId){
    vm.match = {
      score: [],
      played: false,
      league_id: leagueId,
      user_ids: [userId, vm.user.id]
    };
    vm.notifications.splice(vm.notifications.indexOf(obj), 1);

    Match.save({match: vm.match}).$promise.then(()=>{
      Challenge
      .delete({id: reqId});
      CurrentUserService.getUser();
      $rootScope.$on('loggedIn', ()=>{
        vm.user = CurrentUserService.currentUser;
      });
    });

  };
  /////__________________________________________________________________________________
  vm.handleRequest = function(senderId, leagueId, recieverId){
    User.get({id: vm.user.id}).$promise.then((user)=>{
      vm.user = user;
      if(vm.sentRequestIds.includes(leagueId)){
        for (var i = 0; i < vm.user.sent_requests.length; i++) {
          if (vm.user.sent_requests[i].league.id === leagueId) {
            const index = vm.sentRequestIds.indexOf(leagueId);
            vm.sentRequestIds.splice(index, 1);
            vm.removeRequestFromFilter(vm.user.sent_requests[i].id);
          }
        }
      }else{
        vm.sentRequestIds.push(leagueId);
        vm.request(senderId, leagueId, recieverId);
      }
    });
  };
  vm.removeRequestFromFilter = function(requestId){
    vm.justClicked = '';
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
      vm.justClicked = b;
    });
  };

  ///////////////////////////////////////////////////////////////////////

  vm.deleteRequest = function(a){
    Request.delete({id: a.id});
    vm.notifications.splice(vm.notifications.indexOf(a),1);
    CurrentUserService.getUser();
  };

  vm.deleteChallenge = function(a){
    Challenge.delete({id: a.id});
    vm.notifications.splice(vm.notifications.indexOf(a),1);
    CurrentUserService.getUser();
  };


  vm.updateUser = function(e){
    const index = e;
    $rootScope.$on('matchSubmitted', ()=>{
      vm.user.matches.splice(index, 1);
    });
  };
}
