Template.main.loggedIn = function() {
  return !! Meteor.user();
};

Deps.autorun(function() {
});
