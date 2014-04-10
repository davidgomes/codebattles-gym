Template.main.loggedIn = function() {
  return !! Meteor.user();
};

Template.main.helpers({
  inGame: function() {
    var user = Meteor.user();
    return user.playing > 0;
  }
});

Deps.autorun(function() {
  Meteor.subscribe('ownUser');
});
