angular
.module('LeagueApp')
.controller('ChallengeIndexCtrl', ChallengeIndexCtrl);

ChallengeIndexCtrl.$inject =['$http', 'CurrentUserService',  '$rootScope'];

function ChallengeIndexCtrl($http, CurrentUserService, $rootScope) {

  const vm = this;

  vm.user = CurrentUserService.currentUser;
  CurrentUserService.getUser();
  $rootScope.$on('challengeAccepted', ()=>{
    console.log('before', vm.user);
    vm.user = CurrentUserService.currentUser;
    console.log('challengeAccepted', vm.user);
  });
  // $rootScope.$on('matchSubmitted', ()=>{
  //   console.log('before', vm.user);
  //   vm.user = CurrentUserService.currentUser;
  //   console.log('matchSubmitted', vm.user);
  // });
}
