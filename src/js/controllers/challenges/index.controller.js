angular
.module('LeagueApp')
.controller('ChallengeIndexCtrl', ChallengeIndexCtrl);

ChallengeIndexCtrl.$inject =['$http', 'CurrentUserService'];

function ChallengeIndexCtrl($http, CurrentUserService) {

  const vm = this;

  vm.user = CurrentUserService.currentUser; 

}
