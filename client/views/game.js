editor = null;

var altKey = 18;
var submitKey = 83;
var hotkey = false;

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

var width = 100;

function gameTick() {
  $('#progress #bar').animate({"width": width.toString() + "%"}, 1000);
  width--;
  Meteor.setTimeout(gameTick, 1000);
};

startGame = function() {
  gameTick();
};

GameStream = new Meteor.Stream('game_streams');

function countDown (left) {

  if (left <= -1) {
     $( "#countdown" ).fadeTo(200 , 0, function() {
            $('#countdown').toggle();
            startGame();
     });
  }
  else {
    if (left == 3) {
      $('#countdown').show();
    }

    $('#countdown p').fadeTo( 0, 1);
    if (left > 0) {
      $('#countdown p').html(left);
      $('#countdown p').fadeTo(1000, 0, function() {
        left--;
        countDown(left);
      });
    }
    else {
      $('#countdown p').html("Go!");
      $('#countdown p').fadeTo(600, 0, function() {
        left--;
        countDown(left);
      });
    }
  }
};

GameStream.on(Meteor.userId() + ":preStart", function() {
  setTimeout(countDown, 10, 3);
});

submitAnswer = function(code){
  console.log("submit");
}
