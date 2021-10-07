function formatRanking(ranking) {
  const newRanking = [];

  for (let x = 0; x < ranking.length; x += 1) {
    newRanking.push({
      name: ranking[x].name,
      succes_rate: ranking[x].succes_rate,
    });
  }

  return newRanking;
}

module.exports = formatRanking;
