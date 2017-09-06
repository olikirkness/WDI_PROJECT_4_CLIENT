angular
  .module('LeagueApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function RegisterCtrl(User, CurrentUserService, $state, $rootScope){
  const vm = this;

  vm.register = () => {

    vm.user.ranking = [1000];
    vm.user.matches_won = 0;

    User
      .register(vm.user)
      .$promise
      .then(() => {
        $rootScope.$broadcast('notHome');
        CurrentUserService.getUser();
        $state.go('leaguesIndex');
      }, err => {
        console.log(err);
      });
  };
}
