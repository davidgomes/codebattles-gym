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
};

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
  changeInstructions();
};

selectJavascript = function() {
  language = "javascript";
  $("#ruby").removeClass("selected");
  $("#javascript").addClass("selected");
  $("#python").removeClass("selected");
  changeInstructions();
};

selectPython = function() {
  language = "python";
  $("#ruby").removeClass("selected");
  $("#javascript").removeClass("selected");
  $("#python").addClass("selected");
  changeInstructions();
};

var rubyInfo1 = "<p>You choose Ruby! To read input use 'gets' ('.chomp' if necessary) and to print output use 'puts'.</p>\n<p>As an example problem: Given an integer 'N', print the first 'N' natural numbers."
var rubyInfo2 = "<code><br/>n = gets.to_i<br/>\tfor i in 1..n do<br/>\tputs i<br/>end<br/></code>";
var javascriptInfo1 = "<p>A wise choice, JavaScript. To read input use 'readline()' to print output use 'print()'.</p>\n<p>As an example problem: Given an integer 'N', print the first 'N' natural numbers.</p>"
var javascriptInfo2 = "<code><br/>n = gets.to_i<br/>\tfor i in 1..n do<br/>\tputs i<br/>end<br/></code>";
var pythonInfo1 = "<p>Your weapon is Python 2. To read input use 'raw_input()' and to print output use 'print'.</p>\n<p>As an example problem: Given an integer 'N', print the first 'N' natural numbers.</p>"
var pythonInfo2 = "<code><br/>n = gets.to_i<br/>\tfor i in 1..n do<br/>\tputs i<br/>end<br/></code>";

changeInstructions = function() {
  if (language === "ruby") {
    $("#instructions").html(rubyInfo1 + rubyInfo2);
  } else if (language === "javascript") {
    $("#instructions").html(javascriptInfo1 + javascriptInfo2);
  } else if (language === "python") {
    $("#instructions").html(pythonInfo1 + pythonInfo2);
  }
};

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

changeInstructions();
