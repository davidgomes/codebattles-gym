Meteor.publish('usersLSub', function(){
  return Meteor.users.find({ },
                           { fields: { username: 1, playing: 1 } });
});
