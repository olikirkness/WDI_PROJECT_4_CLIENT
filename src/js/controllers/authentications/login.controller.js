angular
  .module('LeagueApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function LoginCtrl(User, CurrentUserService, $state, $rootScope) {
  const vm = this;
  vm.login = () => {

    User
      .login(vm.user).$promise
      .then(() => {
        $rootScope.$broadcast('notHome');
        CurrentUserService.getUser();
        $state.go('leaguesIndex');
      }, err => {
        console.log(err);
      });
  };
}
