var ADD_TIME = 5;

var Future = Npm.require('fibers/future');

GameStream = new Meteor.Stream('game_streams');

GameStream.permissions.write(function(eventName) {
  return true;
});

GameStream.permissions.read(function(eventName) {
  return true;
});

var sessionHash = { };

function gameOver(id) {
  Meteor.clearInterval(sessionHash[id]);
  sessionHash[id] = null;

  Meteor.users.update(id, { $set: { playing: 2 } });

  GameStream.emit(id + ":gameOver");
}

function startRound(id, roundL) {
  var user = Meteor.users.findOne(id);

  if (!user) {
    return;
  }

  var time = user.time;

  /* Method: Pick random from list */
  // Best fit so far
  var problem = null, hazard = null, best = -100, counter = 0, round = 1 + Math.round(roundL / 3);

  if (round > 7) {
    round = 7;
  }

  while (true) {
    var rank = Math.max(1, round - Math.floor(Math.random() * 5));

    var lproblem = getProblemByRank(rank);

    if (lproblem.id == user.problemId) {
      continue;
    }

    var lhazard = getHazardById(lproblem.hazards[Math.floor(lproblem.hazards.length * Math.random())]);

    var realRank = parseInt(lhazard.difficulty) + lproblem["difficulty"];

    if (Math.abs(round - realRank) < Math.abs(round - best)) {
      problem = lproblem;
      hazard = lhazard;
      best = realRank;
    }

    counter++;

    if (best == round || counter >= 15) {
      break;
    }
  }

  Meteor.users.update(id, { $inc: { score: 1 } });
  Meteor.users.update(id, { $inc: { time: ADD_TIME } });
  Meteor.users.update(id, { $set: { problemId: problem.id } });

  GameStream.emit(id + ":startRound", time + ADD_TIME, problem.statement, hazard, user.score + 1);

  Meteor.clearTimeout(sessionHash[user._id]);

  sessionHash[id] = Meteor.setTimeout(function() {
    gameOver(id);
  }, (time + ADD_TIME) * 1000);
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
    Meteor.users.update(user._id, { $set: { time: ADD_TIME / 2 } });
    Meteor.users.update(user._id, { $set: { score: 0 } });

    GameStream.emit(user._id + ":preStart");

    Meteor.clearInterval(sessionHash[user._id]);

    sessionHash[user._id] = Meteor.setTimeout(function() {
      startRound(user._id, 1);
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

  submit: function(code, language) {
    var user = Meteor.user();

    if (!user) {
      return 'Not in game';
    }

    if (user.playing !== 1) {
      return 'Not in game';
    }

    if (code === 'xxx') {
      startRound(user._id, user.score + 1);
      return 'Accepted';
    }

    var future = new Future();

    Meteor.call('runCode', code, language, user.problemId, function(error, response) {
      var user = Meteor.user();

      if (!user) {
        throw new Meteor.Error(401, "You need to be logged in to submit");
      }

      if (response == "Accepted") {
        startRound(user._id, user.score + 1);
      }

      future.return(response);
    });

    return future.wait();
  }
});
