Template.header.loggedIn = function() {
  return !! Meteor.user();
};

Template.header.username = function() {
  return Meteor.user().username;
};

Template.header.events({
  'click .logout-button': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
