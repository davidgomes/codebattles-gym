editor = null;
hazard = null;

var altKey = 18;
var submitKey = 83;
var hotkey = false;

var countdownAudio = new Audio('fx/startround.mp3');
var rightAnswerAudio = new Audio('fx/rightanswer.mp3');
var wrongAnswerAudio = new Audio('fx/wronganswer.mp3');

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
  },

  'keydown': function(event) {
    if (event.keyCode === altKey) {
      hotkey = true;
    }
  },

  'keydown #actual-editor': function(event) {
    if (hotkey) {
      if (event.keyCode === submitKey) {
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

var startGame = function(time) {
  editor.setOption('mode', language);

  $('#progress #bar').clearQueue();
  $('#progress #bar').width("100%");
  $('#progress #bar').animate({ "width": "0%" }, time * 1000, "linear");
  $('#feedback').hide();

  Meteor.call('getProblemStatementById', 0, function(error, response) {
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log(response);
      $('#problem-statement').html(response);
    }
  });
  
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

GameStream.on(Meteor.userId() + ":gameOver", function() {
  Meteor.clearInterval(gameLoop);
  gameLoop = null;
});

GameStream.on(Meteor.userId() + ":startRound", function(time) {
  startGame(time);
  hazard.execute();
  editor.focus();
});

GameStream.on(Meteor.userId() + ":preStart", function() {
  setTimeout(countDown, 10, 3);
  countdownAudio.play();
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

Template.game.created = function () {
  hazard = hazards.russianRoulette;
};

Template.game.helpers({
  hazardName: function() {
    return hazard.name;
  },

  hazardInfo: function() {
    return hazard.description;
  }
});
