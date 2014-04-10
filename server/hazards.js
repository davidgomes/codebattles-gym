var hazards = JSON.parse(Assets.getText("hazards.json"));

//helpers

var threshold = 10;

getHazardByRank = function(rank) {
  var rhazards = new Array();
  for (var i = 0; i < hazards.length; i++){
    if (Math.abs(hazards[i].rank - rank) <= threshold){
      rhazards.push(hazards[i]);
    }
  }
  var index = Math.floor((Math.random()*rhazards.length));
  return rhazards[index];
}

console.log(getHazardByRank(20));
