angular
.module('LeagueApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', 'User', 'League', 'Request', 'Challenge', 'Match'];
function MainCtrl($rootScope, CurrentUserService, $state, User, League, Request, Challenge, Match) {
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    console.log(vm.user);
    vm.notifications = [];
    vm.allUsers = User.query();
    vm.allUsers
    .$promise
    .then((users)=>{
      vm.user = CurrentUserService.currentUser;
      vm.allUsers = users;
    })
    .then(()=>{
      for (var i = 0; i < vm.user.recieved_requests.length; i++) {
        for (var a = 0; a < vm.allUsers.length; a++) {
          if(vm.user.recieved_requests[i].sender_id === vm.allUsers[a].id){
            vm.user.recieved_requests[i].user = vm.allUsers[a];
            vm.notifications.push(vm.user.recieved_requests[i]);
          }
        }
      }
      for (var b = 0; b < vm.user.recieved_challenges.length; b++) {
        for (var c = 0; c < vm.allUsers.length; c++) {
          if(vm.user.recieved_challenges[b].sender_id === vm.allUsers[c].id){
            vm.user.recieved_challenges[b].user = vm.allUsers[c];
            vm.notifications.push(vm.user.recieved_challenges[b]);
          }
        }
      }
    });
  });

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

    Match.save({match: vm.match}).$promise.then((data)=>{
      console.log(data);
      vm.user.recieved_challenges.splice(obj.$index, 1);
      vm.notifications.splice(obj.$index+vm.user.recieved_requests.length, 1);
      Challenge
        .delete({id: reqId});

    });

    // Match.get({id: leagueId})
    // .$promise
    // .then((data)=>{
    //   vm.leagueToAdd = {
    //     id: data.id,
    //     title: data.title,
    //     image: data.image,
    //     user_ids: [],
    //     creator_id: data.creator.id
    //   };
    //   for (var i = 0; i < data.users.length; i++) {
    //     vm.leagueToAdd.user_ids.push(data.users[i].id);
    //   }
    //   vm.leagueToAdd.user_ids.push(userId);
    //   League
    //   .update({id: vm.leagueToAdd.id}, {league: vm.leagueToAdd})
    //   .$promise
    //   .then(()=>{
    //
    //     vm.user.recieved_challenges.splice(obj.$index, 1);
    //     Challenge
    //     .delete({id: reqId});
    //   });
    // });
  };

  vm.deleteRequest = function(a, b){
    const index = a.$index;
    Request.delete({id: b});
    vm.user.recieved_requests.splice(index, 1);
  };
}
