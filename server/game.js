GameStream = new Meteor.Stream('game_streams');

GameStream.permissions.write(function(eventName) {
  return true;
});

GameStream.permissions.read(function(eventName) {
  return true;
});

var sessionHash = {};

function startRound(id) {
  GameStream.emit(id + ":startRound");

  sessionHash[id] = Meteor.setTimeout(function() {
    startRound(id);
  }, 11000);
};

Meteor.methods({
  preStart: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    Meteor.users.update(user._id, { $set: { playing: 1 } });

    GameStream.emit(user._id + ":preStart");

    Meteor.clearInterval(sessionHash[user._id]);
    sessionHash[user._id] = Meteor.setTimeout(function() {
      startRound(user._id);
    }, 3700);
  },

  exitGame: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    Meteor.clearTimeout(sessionHash[user._id]);
    delete sessionHash[user._id];
    Meteor.users.update(user._id, { $set: { playing: 0 } });
  },

  submit: function(code) {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    return "Accepted";
  }    
});
