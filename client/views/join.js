Template.join.events({
  'click .submit-button': function(event) {
    event.preventDefault();

    Meteor.call("preStart");
  }
});
