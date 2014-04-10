GameStream = new Meteor.Stream('game_streams');

GameStream.permissions.write(function(eventName) {
  return true;
});

GameStream.permissions.read(function(eventName) {
  return true;
});

startGame = function() {
  
};

Meteor.methods({
  preStart: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    Meteor.users.update(user._id, { $set: { playing: 1 } });

    GameStream.emit(user._id + ":preStart");
    Meteor.setTimeout(startGame, 3000);
  },

  exitGame: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    Meteor.users.update(user._id, { $set: { playing: 0 } });
  }
});
