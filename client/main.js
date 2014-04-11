Template.main.loggedIn = function() {
  return !! Meteor.user();
};

Template.main.helpers({
  inGame: function() {
    var user = Meteor.user();
    return user.playing > 0;
  }
});

Template.main.events({
  'submit #loginform': function(event) {
    event.preventDefault();
    sign();
  }
});

Deps.autorun(function() {
  Meteor.subscribe('ownUser');
});

function sign() {
  var password = $("#password").val();
  var uname = $("#username").val();

  Meteor.loginWithPassword(uname, password, function(error) {
    if (error) {
      throwError(error.reason);
    } else {
      $('#signInModal').modal('hide');
    }
  });
}
