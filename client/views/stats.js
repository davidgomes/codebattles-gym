Template.stats.numRounds = function() {  
  return Meteor.user().score;
};

Template.stats.oneRound = function() {
  return Meteor.user().score == 1;
};

Template.stats.events({
  'click .try-again-button': function(event) {
    event.preventDefault();
    
    Meteor.call("exitGame");
    joining = true;
  }
});
