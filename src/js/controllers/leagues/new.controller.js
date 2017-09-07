angular
.module('LeagueApp')
.controller('LeagueNewCtrl', LeagueNewCtrl);

LeagueNewCtrl.$inject =['League', '$state', 'CurrentUserService'];

function LeagueNewCtrl( League, $state, CurrentUserService) {

  const vm = this;
  vm.submit = function(){
    if(vm.league.image && vm.league.club && vm.league.title){
      vm.league.created_by = CurrentUserService.currentUser.id;
      vm.league.user_ids = [CurrentUserService.currentUser.id];
      League.save({league: vm.league}).$promise.then((e)=>{
        $state.go('leagueShow', {id: e.id});
      });
    }
  };
}
