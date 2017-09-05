angular
.module('LeagueApp')
.service('ResultsService', ResultsService);

ResultsService.$inject = [];
function ResultsService() {
  const self = this;

  self.processResults = function(result){
    if(result >100){
      self.result = parseInt(result.toString().split('').pop().join(''));
    }
  };

  self.getRatings = function (p1, p2, game){
    self.player1Start = p1;
    self.player2Start = p2;
    let player1PointScore = 0;
    let player2PointScore = 0;
    let player1GameScore = 0;
    let player2GameScore = 0;
    self.scoring = '';
    self.gameScoringSystem = [];
    self.isWinner = false;

    for (var a = 0; a < game.length; a = a + 2) {
      if (game[a] && game[a+1] || game[a]===0 || game[a+1] === 0) {

        if (game[a] > game[a+1] && game[a]<11 && game[a]>= 9) {
          self.scoring = 'English to player 1';
          self.gameScoringSystem.push('english');

          player1GameScore++;
        }else if(game[a+1] > game[a] && game[a+1]<11 && game[a+1]>= 9){
          self.scoring = 'English to player 2';
          self.gameScoringSystem.push('english');

          player2GameScore++;
        }

        if(game[a] > game[a+1] && game[a] === 11 && game[a] - game[a+1] >= 2){
          self.scoring = 'American to player 1';
          self.gameScoringSystem.push('american');

          player1GameScore++;
        }else if(game[a] > game[a+1] && game[a] > 11 && game[a]-game[a+1] === 2){
          self.scoring = 'American to player 1';
          self.gameScoringSystem.push('american');

          player1GameScore++;
        }else if(game[a+1] > game[a] && game[a+1] === 11 && game[a+1] - game[a] >= 2){
          self.scoring = 'American to player 2';
          self.gameScoringSystem.push('american');

          player2GameScore++;
        }else if(game[a+1] > game[a] && game[a+1] > 11 && game[a+1]-game[a] === 2){
          self.scoring = 'American to player 2';
          self.gameScoringSystem.push('american');

          player2GameScore++;
        }
        if(game[a] < 9 && game[a+1] < 9){
          self.scoring = 'ERROR';
          self.gameScoringSystem.push('error');
        }
        if(game[a] === game[a+1]){
          self.scoring = 'ERROR';
          self.gameScoringSystem.push('error');
        }
        if(game[a] - game[a+1] !== 2 && game[a] + game[a+1] >= 20 && game[a]>game[a+1]){
          self.scoring = 'ERROR';
          self.gameScoringSystem.push('error');
        }
        if(game[a+1] - game[a] !== 2 && game[a] + game[a+1] >= 20 && game[a+1]>game[a]){
          self.scoring = 'ERROR';
          self.gameScoringSystem.push('error');
        }

        if(self.gameScoringSystem.includes('american') && self.gameScoringSystem.includes('english') || self.gameScoringSystem.includes('error')){
          self.gameScoringSystem.push('error');
          self.scoring = 'ERROR - INCONSISTANT SCORING SYSTEM';
        }
      }
    }

    if(player1GameScore === 3 || player2GameScore === 3){
      if (!self.gameScoringSystem.includes('error')) {
        self.isWinner = true;
      }
    }

    for (var i = 0; i < game.length; i = i + 2) {
      if (game[i] !== undefined && game[i+1] !== undefined) {
        player1PointScore = player1PointScore + game[i];
        player2PointScore = player2PointScore + game[i+1];
      }
    }
    const pointRatio1 = player1PointScore/(player2PointScore + player1PointScore)*0.7;
    const pointRatio2 = player2PointScore/(player2PointScore + player1PointScore)*0.7;
    const gameRatio1 = player1GameScore/(player1GameScore + player2GameScore)*0.3;
    const gameRatio2 = player2GameScore/(player2GameScore + player1GameScore)*0.3;
    const damp1 = pointRatio1 + gameRatio1;
    const damp2 = pointRatio2 + gameRatio2;

    const k1 = p1/8 + 200;
    const k2 = p2/8 + 200;
    const r1 = Math.pow(10, p1/3000);
    const r2 = Math.pow(10, p2/3000);
    const e1 = r1/(r1+r2);
    const e2 = r2/(r1+r2);

    self.result1 = Math.round(p1 + k1 * (damp1-e1));
    self.result2 = Math.round(p2 + k2 * (damp2-e2));
    self.player1GameScore = player1GameScore;
    self.player2GameScore = player2GameScore;
    self.player1Change = Math.round((self.result1)/p1 * 100)-100;
    self.player2Change = Math.round((self.result2)/p2 * 100)-100;
  };
}
