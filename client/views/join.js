language = "javascript";
joining = true;

var keyLeft = 37;
var keyRight = 39;
var keyA = 65;
var keyD = 68;
var keyEnter = 13;

preStart = function() {
  joining = false;
  Meteor.call("preStart");
}

Template.join.events({
  'click .submit-button': function(event) {
    event.preventDefault();
    preStart();
  },

  'click #ruby' : function(event) {
    selectRuby();
  },

  'click #javascript' : function(event) {
    selectJavascript();
  },

  'click #python' : function(event) {
    selectPython();
  }
});

selectRuby = function() {
  language = "ruby";
  $("#ruby").addClass("selected");
  $("#javascript").removeClass("selected");
  $("#python").removeClass("selected");
}

selectJavascript = function() {
  language = "javascript";
  $("#ruby").removeClass("selected");
  $("#javascript").addClass("selected");
  $("#python").removeClass("selected");
}

selectPython = function() {
  language = "python";
  $("#ruby").removeClass("selected");
  $("#javascript").removeClass("selected");
  $("#python").addClass("selected");
}

document.onkeydown = checkKey;

function checkKey(event) {
  if (joining) {
    event = event || window.event;
    if (event.keyCode === keyEnter) {
      preStart();
    } else if ((event.keyCode === keyRight) || (event.keyCode === keyD)) {
      if (language === "ruby") {
        selectJavascript();
      } else if (language === "javascript") {
        selectPython();
      }
    } else if ((event.keyCode === keyLeft) || (event.keyCode === keyA)) {
      if (language === "python") {
        selectJavascript();
      } else if (language === "javascript") {
        selectRuby();
      }
    }
  }
}
