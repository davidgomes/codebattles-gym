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
  language = 'ruby';
  $('#ruby').addClass('selected');
  $('#javascript').removeClass('selected');
  $('#python').removeClass('selected');
  localStorage['chosenLanguage'] = 'ruby';
  changeInstructions();
};

selectJavascript = function() {
  language = 'javascript';
  $('#ruby').removeClass('selected');
  $('#javascript').addClass('selected');
  $('#python').removeClass('selected');
  localStorage['chosenLanguage'] = 'javascript';
  changeInstructions();
};

selectPython = function() {
  language = 'python';
  $('#ruby').removeClass('selected');
  $('#javascript').removeClass('selected');
  $('#python').addClass('selected');
  localStorage['chosenLanguage'] = 'python';
  changeInstructions();
};

Template.join.rendered = function() {
  var savedLanguage = localStorage['chosenLanguage'];
  
  if (typeof savedLanguage === 'undefined') {
    selectJavascript();
  } else {
    if (savedLanguage === "ruby") {
      selectRuby();
    } else if (savedLanguage === "javascript") {
      selectJavascript();
    } else if (savedLanguage === "python") {
      selectPython();
    }
  }
};

var rubyInfo1 = "<p>You choose Ruby! To read input use <em>gets</em> (with <em>.chomp</em> if necessary) and to print output use <em>puts</em>.</p><p>As an example problem: Given an integer <em>N</em>, print the first <em>N</em> natural numbers, each in its own line.</p>";

var rubyInfo2 = "<pre>n = gets.to_i<br/><br/>(1..n).each do |i|<br/>    puts i<br/>end<br/></pre>";

var javascriptInfo1 = "<p>A wise choice, JavaScript. Use <em>readline()</em> to read input and <em>print()</em> to print output.</p><p>As an example problem: Given an integer <em>N</em>, print the first <em>N</em> natural numbers, each in its own line.</p>";

var javascriptInfo2 = "<pre>var n = parseInt(readline());<br/><br/>for (var i = 1; i <= n; i++) {<br/>    print(i);<br/>}<br/></pre>";

var pythonInfo1 = "<p>Your weapon is Python 2. To read input use <em>raw_input()</em> and to print output use <em>print</em>.</p><p>As an example problem: Given an integer <em>N</em>, print the first <em>N</em> natural numbers, each in its own line.</p>";

var pythonInfo2 = "<pre>n = int(raw_input())<br/><br/>for i in range(1, n + 1):</br>    print i<br/></pre>";

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
