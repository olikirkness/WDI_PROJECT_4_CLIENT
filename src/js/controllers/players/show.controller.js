angular
.module('LeagueApp')
.controller('PlayerShowCtrl', PlayerShowCtrl);

PlayerShowCtrl.$inject = ['$stateParams', 'User'];
function PlayerShowCtrl($stateParams, User) {
  const vm = this;
  User.get({id: $stateParams.id}).$promise.then((a)=>{
    vm.player = a;
    console.log(vm.player);
    vm.matchStamps = [];
    vm.formattedMatches = [{x: new Date(vm.player.created_at), y: 1000}];
    for (var i = 0; i < vm.player.matches.length; i++) {
      if(vm.player.matches[i].played){
        vm.matchStamps.unshift(vm.player.matches[i].updated_at.split('').splice(0,10).join(''));
        vm.formattedMatches.push({x: new Date(vm.player.matches[i].updated_at), y: vm.player.ranking.reverse()[i]});
      }
    }
    console.log(vm.formattedMatches);
    vm.levels = new Chartist.Line('.ct-chart', {
      series: [
        {
          name: 'series-1',
          data:
            vm.formattedMatches
        }]
      },{
        axisX: {
          type: Chartist.FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc: function(value) {
            return moment(value).format('MMM D');
          }
        }
      });
    // var chart = new Chartist.Line('.ct-chart', {
    //   series: [
    //     {
    //       name: 'series-1',
    //       data: [
    //         {x: new Date(143134652600), y: 53},
    //         {x: new Date(143234652600), y: 40},
    //         {x: new Date(143340052600), y: 45},
    //         {x: new Date(143366652600), y: 40},
    //         {x: new Date(143410652600), y: 20},
    //         {x: new Date(143508652600), y: 32},
    //         {x: new Date(143569652600), y: 18},
    //         {x: new Date(143579652600), y: 11}
    //       ]
    //     },
    //     {
    //       name: 'series-2',
    //       data: [
    //         {x: new Date(143134652600), y: 53},
    //         {x: new Date(143234652600), y: 35},
    //         {x: new Date(143334652600), y: 30},
    //         {x: new Date(143384652600), y: 30},
    //         {x: new Date(143568652600), y: 10}
    //       ]
    //     }
    //   ]
    // }, {
    //   axisX: {
    //     type: Chartist.FixedScaleAxis,
    //     divisor: 5,
    //     labelInterpolationFnc: function(value) {
    //       return moment(value).format('MMM D');
    //     }
    //   }
    // });

    var pieData = {
      labels: ['Wins', 'Losses'],
      series: [vm.player.matches_won, vm.player.matches.length - vm.player.matches_won]
    };

    var pieOptions = {
      labelInterpolationFnc: function(value) {
        return value[0];
      }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];

    vm.pie = new Chartist.Pie('.pie', pieData, pieOptions, responsiveOptions);

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
