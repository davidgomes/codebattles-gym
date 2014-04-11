Accounts.onCreateUser(function(options, user) {
  user.playing = false;
  user.time = 1;

  if (options.username.length > 10) {
    throw new Meteor.Error(404, "Username should have a maximum of 10 characters.");
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
