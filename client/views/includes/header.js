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
  },

  'click #mute-button': function(event) {
    event.preventDefault();
    
    mute = true;
    
    if (audio != null) {
      audio.pause();
    }
    
    if (gameAudio != null) {
      gameAudio.pause();
    }

    $('#mute-button').html('<span class="glyphicon glyphicon-volume-up"></span> Unmute');
    $('#mute-button').attr('id','unmute-button');
  },

  'click #unmute-button': function(event) {
    event.preventDefault();
    
    mute = false;

    if (hazard() && hazard().name == "Pita Script") {
      audio.play();
    } else {
      gameAudio.play();
    }
    

    $('#unmute-button').html('<span class="glyphicon glyphicon-volume-off"></span> Mute');
    $('#unmute-button').attr('id','mute-button');
  }
});
