angular
  .module('LeagueApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state){
  const vm = this;

  vm.register = () => {
    vm.user.ranking = [1000];
    vm.user.matches_won = 0;
    User
      .register(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('leaguesIndex');
      }, err => {
        console.log(err);
      });
  };
}
