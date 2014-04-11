var ADD_TIME = 60;

var Future = Npm.require('fibers/future');

GameStream = new Meteor.Stream('game_streams');

GameStream.permissions.write(function(eventName) {
  return true;
});

GameStream.permissions.read(function(eventName) {
  return true;
});

var sessionHash = {};

function gameOver(id) {
  Meteor.clearInterval(sessionHash[id]);
  sessionHash[id] = null;

  GameStream.emit(id + ":gameOver");
}

function startRound(id) {
  var user = Meteor.users.findOne(id);

  if (!user) {
    return;
  }
  
  var time = user.time;
  var problem = getProblemByRank(1);

  GameStream.emit(id + ":startRound", time + ADD_TIME, problem.statement);

  Meteor.clearInterval(sessionHash[user._id]);
  sessionHash[id] = Meteor.setTimeout(function() {
    gameOver(id);
  }, time + ADD_TIME);
};

Meteor.methods({
  preStart: function() {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to start games");
    }

    if (user.playing != 0) {
      throw new Meteor.Error(402, "A game as already started");
    }

    Meteor.users.update(user._id, { $set: { playing: 1 } });
    Meteor.users.update(user._id, { $set: { time: 0 } });

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

  submit: function(input, language) {
    var future = new Future();

    Meteor.call('runCode', input, language, 0, function(error, response) {
      var user = Meteor.user();

      if (!user) {
        throw new Meteor.Error(401, "You need to be logged in to submit");        
      }

      if (response == "Accepted") {
        startRound(user._id);
      }

      future.return(response);
    });

    return future.wait();
  }
});
