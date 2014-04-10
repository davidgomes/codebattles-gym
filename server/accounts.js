Accounts.onCreateUser(function(options, user) {
  user.playing = false;

  if (options.username.length > 6) {
    throw new Meteor.Error(404, "Username should have a maximum of 6 characters.");
  }

  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});
