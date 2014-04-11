Accounts.onCreateUser(function(options, user) {
  user.playing = 0;
  user.time = 1;
  user.problemId = -1;

  if (options.username.length > 10) {
    throw new Meteor.Error(404, "Username should have a maximum of 10 characters.");
  }

  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});

Accounts.onLogin(function(options) {
  Meteor.users.update(options.user._id, { $set: { playing: 0 } });
});

Meteor.users.deny({
  update: function(userId) {
    return false;
  }
});
