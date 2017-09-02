angular
  .module('LeagueApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;
  console.log('LOGIN');
  vm.login = () => {

    User
      .login(vm.user).$promise
      .then(() => {
        console.log('LubuobiooiOGIN');
        CurrentUserService.getUser();
        $state.go('leaguesIndex');
      }, err => {
        console.log(err);
      });
  };
}
