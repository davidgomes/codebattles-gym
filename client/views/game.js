editor = null;
cstatement = null;

keyboardHazard1 = false;
keyboardHazard2 = false;
clippyHazard = false;

mute = false;

var _hazard = null;
var _hazardDeps = new Deps.Dependency;

var _time = null;
var _timeDeps = new Deps.Dependency;

var _round = null;
var _roundDeps = new Deps.Dependency;

var upTimeout = null;
var downTimeout = null;

var endTime = 0;

submitEnabled = true;
var altKey = 18;
var submitKey = 83;
var hotKey = false;
var enterKey = 13;
var backspaceKey = 8;
var deleteKey = 46;

var countdownAudio = new Audio('fx/startround.mp3');
var rightAnswerAudio = new Audio('fx/rightanswer.mp3');
var wrongAnswerAudio = new Audio('fx/wronganswer.mp3');
gameAudio = new Audio('music/maintheme.mp3');
gameAudio.volume = 0.5;
gameAudio.loop = true;
audio = new Audio('music/pitascript.mp3');
audio.loop = true;
audio.volume = 0.55;

hazard = function() {
  _hazardDeps.depend();
  return _hazard;
};

var setHazard = function(w) {
  if (_hazard !== w) {
    _hazard = w;
    _hazardDeps.changed();
  }
};

var time = function() {
  _timeDeps.depend();
  return _time;
};

var setTime = function(w) {
  if (_time !== w) {
    _time = w;
    _timeDeps.changed();
  }
};

var round = function() {
  _roundDeps.depend();
  return _round;
};

var setRound = function(w) {
  if (_round !== w) {
    _round = w;
    _roundDeps.changed();
  }
};

function reloadEditor() {
  editor = new CodeMirror(document.getElementById('actual-editor'), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    mode: 'python',
    theme: 'mbo'
  });

  editor.setSize(700, 360);
}

Template.game.rendered = function () {
  reloadEditor();
  setHazard(null);
};

Template.game.events({
  'click .exit-button': function(event) {
    event.preventDefault();

    if (confirm("Exit Game?")) {
      Meteor.call("exitGame");
      joining = true;
      clearHazard(hazard());
      Meteor.clearTimeout(gameLoop);
      gameAudio.pause();
    }
  },

  'click .submit-button': function(event) {
    event.preventDefault();
    if (submitEnabled) {
      submitAnswer();
    }
  },

  'keydown': function(event) {
    if (event.keyCode === altKey) {
      hotKey = true;
    }
  },

  'keydown #actual-editor': function(event) {
    if (hotKey) {
      if ((event.keyCode === submitKey) && (submitEnabled)) {
        event.preventDefault();
        submitAnswer();
      }
    }

    if (keyboardHazard1) {
      if (event.keyCode === enterKey) {
        event.preventDefault();
        var line = editor.doc.lineCount() - 1;
        editor.removeLine(line);
      }
    }

    if (keyboardHazard2) {
      if ((event.keyCode === backspaceKey) || (event.keyCode === deleteKey)) {
        event.preventDefault();
        var line = editor.doc.lineCount() - 1;
        editor.removeLine(line);
      }
    }

    if (clippyHazard) {
      var currentOpacity = parseFloat($('#spicy').css('opacity'));
      $('#spicy').css('opacity', currentOpacity - 0.2);
    }
  },

  'keyup': function(event) {
    if (event.keyCode === altKey) {
      hotKey = false;
    }
  }
});

var gameLoop;

function gameTick() {
  var timeLeft = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  setTime(timeLeft);
  Meteor.clearTimeout(gameLoop);
  gameLoop = Meteor.setTimeout(gameTick, 1000);
};

var startGame = function(time, statement, lhazard, round) {
  editor.setOption('mode', language);
  editor.setValue("");

  $('#progress #bar').clearQueue();
  $('#progress #bar').stop();
  $('#progress #bar').width(Math.floor(time / 3).toString() + "%");
  $('#progress #bar').animate({ width: "0%" }, time * 1000, "linear");

  $('#time').clearQueue();
  $('#time').stop();
  $('#time').css('left', Math.floor(time / 3).toString() + "%");
  $('#time').animate({ left: "0%" }, time * 1000, "linear");

  $('#feedback').hide();
  $('#problem-statement').text(statement);

  endTime = time * 1000 + Date.now();

  setRound(round);

  changeScore(30);

  clearHazard(hazard());
  setHazard(lhazard);
  runHazard(lhazard);

  Meteor.clearTimeout(gameLoop);
  gameTick();
};

GameStream = new Meteor.Stream('game_streams');

function countDown(left) {
  if (left <= -1) {
    $( "#countdown" ).fadeTo(200 , 0, function() {
      $('#countdown').toggle();
    });

    gameAudio.pause();
    gameAudio.currentTime = 0;

    if (!mute) {
      gameAudio.play();
    }
  } else {
    if (left == 3) {
      $('#countdown').show();
      $('#game').show();
    }

    $('#countdown p').fadeTo(0, 0);

    if (left > 0) {
      $('#countdown p').html(left);

      $('#countdown p').fadeTo(1000, 1, function() {
        left--;
        countDown(left);
      });
    } else {
      $('#countdown p').html("Go!");

      $('#countdown p').fadeTo(600, 1, function() {
        left--;
        countDown(left);
      });
    }
  }
};

Deps.autorun(function() {
  GameStream.on(Meteor.userId() + ":gameOver", function() {
    gameAudio.pause();
    clearHazard(hazard());
    Meteor.clearInterval(gameLoop);
    gameLoop = null;

    setTime(0);

    $('#progress #bar').clearQueue();
    $('#progress #bar').stop();
    $('#progress #bar').width("0%");

    $('#time').clearQueue();
    $('#time').stop();
    $('#time').css('left', "0%");
  });

  GameStream.on(Meteor.userId() + ":startRound", function(time, statement, hazard, round) {
    cstatement = statement;
    startGame(time, statement, hazard, round);
    editor.focus();
  });

  GameStream.on(Meteor.userId() + ":preStart", function() {
    setTimeout(countDown, 10, 3);

    if (!mute) {
      countdownAudio.pause();
      countdownAudio.currentTime = 0;
      countdownAudio.play();
    }
  });
});

submitAnswer = function() {
  Meteor.call('submit', editor.getValue(), language, function(error, result) {
    if (result != "Accepted") {
      $('#feedback').show();
      $('#feedback-error').html(result);

      if (result == "Wrong Answer") {
        changeScore(-5);
        setTime(time() - 5);
        endTime = time() * 1000 + Date.now();
        $('#progress #bar').clearQueue();
        $('#progress #bar').width(Math.floor(time() / 3).toString() + "%");
        $('#progress #bar').animate({ width: "0%" }, time() * 1000, "linear");

        $('#time').clearQueue();
        $('#time').stop();
        $('#time').css('left', Math.floor(time() / 3).toString() + "%");
        $('#time').animate({ left: "0%" }, time() * 1000, "linear");
      }

      if (!mute) {
        wrongAnswerAudio.pause();
        wrongAnswerAudio.currentTime = 0;
        wrongAnswerAudio.play();
      }
    } else {

      if (!mute) {
        rightAnswerAudio.pause();
        rightAnswerAudio.currentTime = 0;
        rightAnswerAudio.play();
      }
    }
  });
};

changeScore = function(score) {
  if(score > 0) {
    console.log("scoreup");
    $("#scoreUp").html("+" + score);
    $("#scoreUp").show();
    if (upTimeout) {
      Meteor.clearTimeout(upTimeout);
    }
    upTimeout = Meteor.setTimeout(function() {
      $("#scoreUp").hide();
    }, 1000);
  }
  else {
    $("#scoreDown").html(score);
    $("#scoreDown").show();
    if (downTimeout) {
      Meteor.clearTimeout(downTimeout);
    }
    downTimeout = Meteor.setTimeout(function() {
      $("#scoreDown").hide();
    }, 1000);
  }
};

Template.game.helpers({
  hazardName: function() {
    if (hazard()) {
      return hazard().name;
    }
    return "";
  },

  hazardInfo: function() {
    if (hazard()) {
      return hazard().description;
    }
    return "";
  },

  gameOver: function() {
    return Meteor.user().playing == 2;
  },

  language: function() {
    return language;
  },

  time: function() {
    return time();
  },

  score: function() {
    return round();
  }
});
