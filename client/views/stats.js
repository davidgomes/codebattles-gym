Template.stats.helpers({
  numRounds: function() {  
    return Meteor.user().score;
  },

  oneRound: function() {
    return Meteor.user().score == 1;
  },

  effort: function() {
    var score = Meteor.user().score;
    if (score < 4) {
      return "1";
    } else if (score < 3) {
      return "2";
    } else if (score < 6) {
      return "3";
    } else if (score < 8) {
      return "4";
    } else if (score < 10) {
      return "5";
    } else if (score < 12) {
      return "6";
    } else if (score < 14) {
      return "7";
    } else if (score < 16) {
      return "8";
    } else {
      return "9";
    }
    return "1";
  },

  effortText: function() {
    var score = Meteor.user().score;
    if (score < 4) {
      return "... I mean... Embarrassing...";
    } else if (score < 3) {
      return "You gotta train muuuuuch harder!";
    } else if (score < 6) {
      return "Nice try pal.";
    } else if (score < 8) {
      return "I guess it could have been worse.";
    } else if (score < 10) {
      return "You're getting good!";
    } else if (score < 12) {
      return "Well done dude!";
    } else if (score < 14) {
      return "Woah, what a score!!";
    } else if (score < 16) {
      return "Mindblowing!!!!!";
    } else {
      return "You have won the title of emperor of code.";
    }
    return "1";
  }
});

Template.stats.events({
  'click .try-again-button': function(event) {
    event.preventDefault();
    
    Meteor.call("exitGame");
    joining = true;
  }
});
