editor = null;
audio = null;
keyboardHazard1 = false;

var _hazard = null;
var _hazardDeps = new Deps.Dependency;

var altKey = 18;
var submitKey = 83;
var hotkey = false;
var enterKey = 13;

var countdownAudio = new Audio('fx/startround.mp3');
var rightAnswerAudio = new Audio('fx/rightanswer.mp3');
var wrongAnswerAudio = new Audio('fx/wronganswer.mp3');


var hazard = function() {
  _hazardDeps.depend();
  return _hazard;
};

var setHazard = function(w) {
  if (_hazard !== w) {
    _hazard = w;
    _hazardDeps.changed();
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
      if (audio != null) {
        audio.pause();
        audio = null;
      }
      Meteor.clearTimeout(gameLoop);
    }
  },

  'click .submit-button': function(event) {
    event.preventDefault();
    submitAnswer();

    if (keyboardHazard1) {
      if (event.keyCode === enterKey) {
        event.preventDefault();
        line = editor.doc.lineCount();
        editor.removeLine(line-1);
      }
    }
  },

  'keydown': function(event) {
    if (event.keyCode === altKey) {
      hotkey = true;
    }
  },

  'keydown #actual-editor': function(event) {
    if (hotkey) {
      if (event.keyCode === submitKey) {
        event.preventDefault();
        submitAnswer();
      }
    }
  },

  'keyup': function(event) {
    if (event.keyCode === altKey) {
      hotkey = false;
    }
  }
});

var gameLoop;

function gameTick() {
  gameLoop = Meteor.setTimeout(gameTick, 1000);
};

var startGame = function(time, statement, lhazard) {
  editor.setOption('mode', language);

  $('#progress #bar').clearQueue();
  $('#progress #bar').width("100%");
  $('#progress #bar').animate({ "width": "0%" }, time * 1000, "linear");
  $('#feedback').hide();
  $('#problem-statement').text(statement);

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
  } else {
    if (left == 3) {
      $('#countdown').show();
    }

    $('#countdown p').fadeTo( 0, 0);

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
    Meteor.clearInterval(gameLoop);
    gameLoop = null;
  });

  GameStream.on(Meteor.userId() + ":startRound", function(time, statement, hazard) {
    startGame(time, statement, hazard);
    hazard.execute();
    editor.focus();
  });

  GameStream.on(Meteor.userId() + ":preStart", function() {
    setTimeout(countDown, 10, 3);
    countdownAudio.play();
  });
});

submitAnswer = function() {
  Meteor.call('submit', editor.getValue(), language, function(error, result) {
    if (result != "Accepted") {
      $('#feedback').show();
      $('#feedback-error').html(result);
      wrongAnswerAudio.play();
    }
    else {
      rightAnswerAudio.play();
    }
  });
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
  }
});
