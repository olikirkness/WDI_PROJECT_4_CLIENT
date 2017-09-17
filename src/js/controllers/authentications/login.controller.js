angular
  .module('LeagueApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function LoginCtrl(User, CurrentUserService, $state, $rootScope) {
  const vm = this;
  vm.error = false;
  vm.login = () => {
    $rootScope.$broadcast('notLeagueIndex');
    User
      .login(vm.user).$promise
      .then(() => {
        $rootScope.$broadcast('notHome');
        CurrentUserService.getUser();
        $state.go('leaguesIndex');
      }, err => {
        vm.error = true;
        console.log(err);
      });
  };
}
