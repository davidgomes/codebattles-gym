treshold = 10;

getHazardByRank = function(rank) {
  var rhazards = [];

  for (var i = 0; i < hazards.length; i++) {
    if (Math.abs(hazards[i].rank - rank) <= threshold) {
      rhazards.push(hazards[i]);
    }
  }

  var index = Math.floor((Math.random() * rhazards.length));
  return rhazards[index];
};
