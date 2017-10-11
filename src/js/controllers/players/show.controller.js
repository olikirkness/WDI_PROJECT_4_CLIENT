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
    vm.rankings = vm.player.ranking.reverse();
    for (var i = 0; i < vm.player.matches.length; i++) {
      if(vm.player.matches[i].played){
        vm.matchStamps.push(vm.player.matches[i].updated_at);
        vm.formattedMatches.push(
          {
            x: new Date(vm.player.matches[i].updated_at),
            y: vm.rankings[vm.count]
          }
        );
        vm.count++;
      }
    }
    console.log(vm.formattedMatches, vm.player.ranking);
    vm.levels = new Chartist.Line('.ct-chart', {
      series: [
        {
          name: 'series-1',
          data: vm.formattedMatches
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
        series: [vm.player.matches_won, vm.formattedMatches.length - 1 -vm.player.matches_won],
        labels: [`Wins: ${Math.round(vm.player.matches_won/(vm.formattedMatches.length - 1 )*100)}%`, `Losses: ${Math.round((vm.formattedMatches.length - 1 - vm.player.matches_won)/(vm.formattedMatches.length - 1 )*100)}%`]
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

      vm.pie = new Chartist.Pie('.pie', pieData, pieOptions, responsiveOptions);
      vm.weeksTally = {};
      vm.matchStamps.push(new Date());
      for (var d = 0; d < vm.matchStamps.length; d++) {
        vm.dif = (new Date(vm.matchStamps[0]).getTime() - new Date(vm.matchStamps[d]).getTime()) / (24 * 60 * 60 * 1000);
        vm.thisWeek = Math.ceil(Math.abs(vm.dif/7));
        if (vm.weeksTally[`${vm.thisWeek}`] === undefined && d !== vm.matchStamps.length - 1) {
          vm.weeksTally[`${vm.thisWeek}`] = 1;
        } else {
          vm.weeksTally[`${vm.thisWeek}`]++;
        }
        if (d === vm.matchStamps.length - 1) {
          vm.max = vm.thisWeek;
        }
      }
      vm.frequency = [];
      vm.weeks = [];
      vm.maxFreq = 0;
      for (var e = 0; e <= vm.max; e++) {
        if (vm.weeksTally[`${e}`] !== undefined) {
          vm.frequency.push(vm.weeksTally[e]);
          if (vm.weeksTally[e] > vm.maxFreq) {
            vm.maxFreq = vm.weeksTally[e];
          }
        } else {
          vm.frequency.push( 0 );
        }
        vm.weeks.push(e);
      }
      var barData = {
        labels: vm.weeks,
        series: [vm.frequency]
      };

      var barOptions = {
        seriesBarDistance: 1,
        axisY: {
          offset: 80,
          labelInterpolationFnc: function(value) {
            return value;
          },
          scaleMinSpace: 2,
          onlyInteger: true
        }
      };

      var responsiveOptionsBar = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 1,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];

      vm.bar = new Chartist.Bar('.bar', barData, barOptions, responsiveOptionsBar);

      vm.data = [vm.pie, vm.levels, vm.bar];
    });

    vm.change = false;
    vm.i = 0;
    vm.enableChange = function(){
      vm.i++;
      if(vm.i%2 ===1){
        vm.imageSaved = vm.player.image;
        vm.player.image = '';
        vm.change = true;
      }else{
        vm.change = false;
      }
    };

    vm.changePhoto = function(userId){

      User.update({id: userId}, {user: vm.player}).$promise.then((e)=>{
        console.log(e);
        vm.enableChange();
      });
    };
    vm.cancel = function(){
      vm.player.image = vm.imageSaved;
      vm.enableChange();
    };

  }
