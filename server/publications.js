Meteor.publish('usersLSub', function(){
  return Meteor.users.find(this.userId,
                           { fields: { username: 1, playing: 1 } });
});
