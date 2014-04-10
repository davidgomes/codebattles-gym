Meteor.methods({
  preStart: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    Meteor.users.update(user._id, { $set: { playing: true } });
  },

  startGame: function() {
    
  },

  exitGame: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    Meteor.users.update(user._id, { $set: { playing: false } });
  }
});
