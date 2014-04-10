Accounts.onCreateUser(function(options, user) {
  user.playing = false;

  if (options.username.length > 8) {
    throw new Meteor.Error(404, "Username should have a maximum of 8 characters.");
  }

  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});


Meteor.users.deny({
  update: function(userId) {
    return false;
  }
});
