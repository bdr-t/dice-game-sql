function calculateSucceesRate(won, lost) {
  if (won === 0) return 0;
  return won / (won + lost);
}

const Game = async (won, lost) => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const result = dice1 + dice2 === 7 ? 1 : 0;
  const resultText = dice1 + dice2 === 7 ? 'You Won' : 'You lost';

  const wins = dice1 + dice2 === 7 ? won + 1 : won;
  const loses = dice1 + dice2 !== 7 ? lost + 1 : lost;
  const succesRate = calculateSucceesRate(won, lost);

  return {
    dice1,
    dice2,
    result,
    resultText,
    succes_rate: succesRate,
    won: wins,
    lost: loses,
    game: {
      sumDice: dice1 + dice2,
      result: resultText,
    },
  };
};

module.exports = {
  Game,
};
