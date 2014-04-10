Meteor.startup(function() {
  Meteor.users.update({}, { $set: { playing: 0 } }, { multi: true });
});
