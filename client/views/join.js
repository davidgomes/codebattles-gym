language = "javascript";

Template.join.events({
  'click .submit-button': function(event) {
    event.preventDefault();

    Meteor.call("preStart");
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

