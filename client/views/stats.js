Template.stats.numRounds = function() {  
  return Meteor.user().score;
};

Template.stats.oneRound = function() {
  return Meteor.user().score == 1;
};
