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
    let player1PointScore = 0;
    let player2PointScore = 0;

    let player1GameScore = 0;
    let player2GameScore = 0;
    self.scoring = '';
    self.gameWinningScores = [];
    for (var a = 0; a < game.length; a = a + 2) {
      if (game[a] && game[a+1]) {

        if (game[a] > game[a+1]) {
          player1GameScore++;
          if(game[a] > 11 && game[a]-game[a+1]>2){
            self.scoring = 'error';
            return;
          }else if(game[a] > 11 && game[a]-game[a+1] === 2){
            self.scoring = 'american';
          }else if(game[a] === 11 && game[a]-game[a+1]<2){
            self.scoring = 'error';
            return;
          }else if (game[a] === 11 && game[a+1]<= 9){
            self.scoring = 'american';
          }else if(game[a] !== 11){
            self.scoring = 'error';
            return;
          }else{
            self.scoring = 'american';
          }

          if(game[a] === 9 || game[a] === 10){
            self.scoring = 'english';
          }else if(game[a] < 9 ){
            self.scoring = 'error';
            return;
          }

        }else if(game[a] < game[a+1]) {
          player2GameScore++;
          if(game[a+1] > 11 && game[a+1]-game[a]>2){
            self.scoring = 'error';
            return;
          }else if(game[a+1] > 11 && game[a+1]-game[a] === 2){
            self.scoring = 'american';
          }else if(game[a+1] === 11 && game[a+1]-game[a]<2){
            self.scoring = 'error';
            return;
          }else if (game[a+1] === 11 && game[a]<= 9){
            self.scoring = 'american';
          }else if(game[a+1] !== 11){
            self.scoring = 'error';
            return;
          }else{
            self.scoring = 'american';
          }

          if(game[a+1] === 9 || game[a+1] === 10){
            self.scoring = 'english';
          }else if(game[a+1] < 9 ){
            self.scoring = 'error';
            return;
          }
        }else if(game[a] === game[a+1]){
          self.scoring = 'error';
          return;
        }
      }
    }
    self.isWinner = false;
    if(player1GameScore === 3 || player2GameScore === 3){
      self.isWinner = true;
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
    // console.log('Player One ',p1, '----> ', Math.round(self.result1),  '|    damp1', damp1.toFixed(2), '|   change', Math.round(Math.round(self.result1)/p1 * 100)-100);
    // console.log('Player Two ',p2, '----> ', Math.round(self.result2),  '|    damp2', damp2.toFixed(2), '|   change', Math.round(Math.round(self.result2)/p2 * 100)-100);
    //
    //
    // console.log(player1GameScore, player2GameScore, scoring);
    // console.log('----------------------------------------------------------------------');
  };
}
