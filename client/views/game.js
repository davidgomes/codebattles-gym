editor = null;

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
  }
});

startGame = function() {
  alert("gogogog\n");
};

GameStream = new Meteor.Stream('game_streams');

function countDown (left) {
  if (left <= 0) {

    $('#countdown').html("");
    startGame();
  }
  else {
    $('#countdown').html(left);
    setTimeout(countDown, 1000, left - 1);
  }
};

GameStream.on(Meteor.userId() + ":preStart", function() {
  setTimeout(countDown, 10, 3);
});
