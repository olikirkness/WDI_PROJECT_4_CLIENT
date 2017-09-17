angular
  .module('LeagueApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function RegisterCtrl(User, CurrentUserService, $state, $rootScope){
  const vm = this;
  vm.regError = false;
  vm.register = () => {

    vm.user.ranking = [1000];
    vm.user.matches_won = 0;
    $rootScope.$broadcast('notLeagueIndex');
    User
      .register(vm.user)
      .$promise
      .then(() => {
        $rootScope.$broadcast('notHome');
        CurrentUserService.getUser();
        $state.go('leaguesIndex');
      }, err => {
        vm.regError = true;
        console.log(err);
      });
  };
}
