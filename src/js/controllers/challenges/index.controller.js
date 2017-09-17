angular
.module('LeagueApp')
.controller('ChallengeIndexCtrl', ChallengeIndexCtrl);

ChallengeIndexCtrl.$inject =['$http', 'CurrentUserService',  '$rootScope'];

function ChallengeIndexCtrl($http, CurrentUserService, $rootScope) {

  const vm = this;
  $rootScope.$broadcast('notLeagueIndex');

  vm.user = CurrentUserService.currentUser;
  CurrentUserService.getUser();
  $rootScope.$on('challengeAccepted', ()=>{

    vm.user = CurrentUserService.currentUser;
  });

  vm.count = 0;
  vm.countInc = function () {
    vm.count++;
  };
}
