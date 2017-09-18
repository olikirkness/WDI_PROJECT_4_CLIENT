angular
.module('LeagueApp')
.controller('PlayerShowCtrl', PlayerShowCtrl);

PlayerShowCtrl.$inject = ['$stateParams', 'User', '$rootScope'];
function PlayerShowCtrl($stateParams, User, $rootScope) {
  const vm = this;
  $rootScope.$broadcast('notLeagueIndex');
  User.get({id: $stateParams.id}).$promise.then((a)=>{
    vm.player = a;
    vm.matchStamps = [];
    vm.count = 1;
    vm.formattedMatches = [{x: new Date(vm.player.created_at), y: 1000}];
    for (var i = 0; i < vm.player.matches.length; i++) {
      if(vm.player.matches[i].played){

        vm.matchStamps.unshift(vm.player.matches[i].updated_at.split('').splice(0,10).join(''));
        vm.matchStamps.push(vm.player.matches[i]);

        vm.formattedMatches.push(
          {
            x: new Date(vm.player.matches[i].updated_at),
            y: vm.player.ranking[vm.count]
          }
        );
        // console.log(vm.count, vm.player.ranking.reverse()[vm.count]);
        vm.count++;
      }
    }
    // console.log(vm.formattedMatches, vm.player.ranking, vm.matchStamps);
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
        },
        axisY: {
          type: Chartist.FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc: function (value) {
            return Math.floor(value);
          }
        }
      });


      var pieData = {
        series: [vm.player.matches_won, vm.formattedMatches.length - 1 - vm.player.matches_won],
        labels: [`Wins - ${Math.round(vm.player.matches_won/(vm.formattedMatches.length - 1 )*100)}%`, `Losses - ${Math.round((vm.formattedMatches.length - 1 - vm.player.matches_won)/(vm.formattedMatches.length - 1 )*100)}%`]

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
      var sum = function(a, b) {
        return a + b;
      };
      //

      vm.pie = new Chartist.Pie('.pie', pieData, pieOptions, responsiveOptions);

      vm.data = [vm.levels, vm.pie];
    });

  }
