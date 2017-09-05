angular
.module('LeagueApp')
.controller('PlayerShowCtrl', PlayerShowCtrl);

PlayerShowCtrl.$inject = ['$stateParams', 'User'];
function PlayerShowCtrl($stateParams, User) {
  const vm = this;
  User.get({id: $stateParams.id}).$promise.then((a)=>{
    vm.player = a;
    vm.matchStamps = [];
    for (var i = 0; i < vm.player.matches.length; i++) {
      if(vm.player.matches[i].played){
        vm.matchStamps.unshift(vm.player.matches[i].updated_at.split('').splice(0,10).join(''));
      }
    }
    var data = {
      // A labels array that can contain any sort of values
      labels: vm.matlevels,
      // Our series array that contains series objects or in this case series data arrays
      series: [
        vm.player.ranking
      ]
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    var options = {
      width: 700,
      height: 400
    };
    vm.levels = [new Chartist.Line('.level', data, options)];
    var pieData = {
      series: [5, 3, 4]
    };

    var sum = function(a, b) {
      return a + b;
    };

    vm.pie = new Chartist.Pie('.pie', pieData, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / pieData.series.reduce(sum) * 100) + '%';
      }
    });

    vm.data = [vm.levels, vm.pie];
  });
  //   var ctx = document.getElementById('myChart').getContext('2d');
  //   ctx.canvas.width = 300;
  //   ctx.canvas.height = 300;

  //   ctx.canvas.parentNode.style.height = '128px';
  //
  //   // new Chart(ctx, {
  //   //   type: 'line',
  //   //   data: {
  //   //     labels: vm.matchStamps,
  //   //     datasets: [{
  //   //       fill: true,
  //   //       backgroundColor: '#BF6969',
  //   //       label: 'Ranking',
  //   //       data: vm.player.ranking.reverse()
  //   //     }]
  //   //   },
  //   //   options: {
  //   //     maintainAspectRatio: true,
  //   //     layout: {
  //   //       padding: {
  //   //         left: 0,
  //   //         right: 0,
  //   //         top: 0,
  //   //         bottom: 0
  //   //       }
  //   //     }
  //   //   }
  //   // });
  // });


}
