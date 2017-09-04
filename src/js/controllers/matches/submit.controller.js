angular
.module('LeagueApp')
.controller('MatchSubmitCtrl', MatchSubmitCtrl);

MatchSubmitCtrl.$inject =['$http', '$stateParams', 'Match', 'ResultsService', 'User', '$state', '$rootScope'];

function MatchSubmitCtrl($http, $stateParams, Match, ResultsService, User, $state, $rootScope) {

  const vm = this;

  vm.match = Match.get({id: $stateParams.id});

  vm.results = function(){

    if (vm.score1 !== undefined) {
      if(vm.score1.toString().split('').length > 2){
        vm.score1 = parseInt(vm.score1.toString().split('')[0] + vm.score1.toString().split('')[1]);
      }
    }
    if (vm.score2 !== undefined) {
      if(vm.score2.toString().split('').length > 2){
        vm.score2 = parseInt(vm.score2.toString().split('')[0] + vm.score2.toString().split('')[1]);
      }
    }

    if (vm.score3 !== undefined) {
      if(vm.score3.toString().split('').length > 2){
        vm.score3 = parseInt(vm.score3.toString().split('')[0] + vm.score3.toString().split('')[1]);
      }
    }
    if (vm.score4 !== undefined) {
      if(vm.score4.toString().split('').length > 2){
        vm.score4 = parseInt(vm.score4.toString().split('')[0] + vm.score4.toString().split('')[1]);
      }
    }
    if (vm.score5 !== undefined) {
      if(vm.score5.toString().split('').length > 2){
        vm.score5 = parseInt(vm.score5.toString().split('')[0] + vm.score5.toString().split('')[1]);
      }
    }
    if (vm.score6 !== undefined) {
      if(vm.score6.toString().split('').length > 2){
        vm.score6 = parseInt(vm.score6.toString().split('')[0] + vm.score6.toString().split('')[1]);
      }
    }
    if (vm.score7 !== undefined) {
      if(vm.score7.toString().split('').length > 2){
        vm.score7 = parseInt(vm.score7.toString().split('')[0] + vm.score7.toString().split('')[1]);
      }
    }
    if (vm.score8 !== undefined) {
      if(vm.score8.toString().split('').length > 2){
        vm.score8 = parseInt(vm.score8.toString().split('')[0] + vm.score8.toString().split('')[1]);
      }
    }
    if (vm.score9 !== undefined) {
      if(vm.score9.toString().split('').length > 2){
        vm.score9 = parseInt(vm.score9.toString().split('')[0] + vm.score9.toString().split('')[1]);
      }
    }
    if (vm.score10 !== undefined) {
      if(vm.score10.toString().split('').length > 2){
        vm.score10 = parseInt(vm.score10.toString().split('')[0] + vm.score10.toString().split('')[1]);
      }
    }
    vm.match.score = [vm.score1, vm.score2, vm.score3,vm.score4,vm.score5,vm.score6,vm.score7,vm.score8,vm.score9,vm.score10];
    ResultsService.getRatings(vm.match.users[0].ranking[0], vm.match.users[1].ranking[0], vm.match.score);
    vm.result1 = ResultsService.result1;
    vm.result2 = ResultsService.result2;
    vm.scoring = ResultsService.scoring;
    vm.isWinner = ResultsService.isWinner;
  };

  vm.submit = function(){
    User.get({id: vm.match.users[0].id})
    .$promise
    .then((a) => {
      vm.player1 = a;
      vm.player1.ranking.unshift(vm.result1);
    })
    .then(()=>{
      User.update({id: vm.player1.id}, {user: vm.player1});
    });

    User.get({id: vm.match.users[1].id})
    .$promise.then((b)=>{
      vm.player2 = b;
      vm.player2.ranking.unshift(vm.result2);

    })
    .then(()=>{
      User.update({id: vm.player2.id}, {user: vm.player2}).$promise.then(()=>{
        vm.match.played = true;
        vm.match.player_one_score = ResultsService.player1GameScore;
        vm.match.player_two_score = ResultsService.player2GameScore;
        vm.match.player_one_rank_change = [vm.player1.ranking[0], ResultsService.player1Change, vm.player1.ranking[1]];
        vm.match.player_two_rank_change = [vm.player2.ranking[0], ResultsService.player2Change, vm.player2.ranking[1]];
        Match.update({id: vm.match.id}, {match: vm.match}).$promise.then((a)=>{
          a.played = true;
          $rootScope.$broadcast('matchSubmitted');
          $state.go('leagueShow', {id: vm.match.league.id});
        });
      });
    });
  };

}
