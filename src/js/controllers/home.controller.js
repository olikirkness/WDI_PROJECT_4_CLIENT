angular
.module('LeagueApp')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$rootScope'];
function HomeCtrl($rootScope) {
  const vm = this;
  $rootScope.$broadcast('notLeagueIndex');
  $rootScope.$broadcast('Home');
  vm.registerSection = false;
  vm.loginSection = true;
  vm.goToRegister = goToRegister;
  vm.goToLogin = goToLogin;

  function goToRegister() {
    vm.registerSection = true;
    vm.loginSection = false;
  }

  function goToLogin() {
    vm.loginSection = true;
    vm.registerSection = false;
  }

  $(function() {
    $('a').click(function() {
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
      }, 500);
      return false;
    });
  });
}
