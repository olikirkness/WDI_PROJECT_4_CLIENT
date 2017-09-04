angular
.module('LeagueApp')
.controller('PlayerShowCtrl', PlayerShowCtrl);

PlayerShowCtrl.$inject = ['$stateParams', 'User'];
function PlayerShowCtrl($stateParams, User) {
  const vm = this;
  User.get({id: $stateParams.id}).$promise.then((a)=>{
    vm.player = a;
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.canvas.width = 300;
    ctx.canvas.height = 300;
    vm.matchStamps = [];
    for (var i = 0; i < vm.player.matches.length; i++) {
      if(vm.player.matches[i].played){
        vm.matchStamps.unshift(vm.player.matches[i].updated_at.split('').splice(0,10).join(''));
      }
    }
    ctx.canvas.parentNode.style.height = '128px';
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: vm.matchStamps,
        datasets: [{
          fill: true,
          backgroundColor: '#BF6969',
          label: 'Ranking',
          data: vm.player.ranking.reverse()
        }]
      },
      options: {
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      }
    });
  });

}
