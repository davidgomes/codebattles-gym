Template.main.loggedIn = function() {
  return !! Meteor.user();
};

var slogans = ["If play() return awesome;", "knowledge**fun;", "mind.insert(xp);", "brain++;", "skill<<1;"];

function getSlogan() {
  var index = Math.floor(Math.random() * slogans.length);
  return slogans[index];
}

Template.main.helpers({
  inGame: function() {
    var user = Meteor.user();
    return user.playing > 0;
  },

  slogan: function() {
    return getSlogan();
  }
});

Template.main.events({
  'submit #loginform': function(event) {
    event.preventDefault();

    var sign_type = $("#sign-type").val();
    if (sign_type == "sign-in") {
      signIn();
    } else {
      signUp();
    }
  },

  'click #register-changer': function(event) {
    event.preventDefault();
    changeSignUp();
  },

  'click #sign-changer': function(event) {
    event.preventDefault();
    changeSignIn();
  }
});

Template.main.rendered = function() {
  changeSignIn();

  setInterval(function() {
    var currentSlogan = $('#slogan').text();
    var newSlogan;

    do {
      newSlogan = getSlogan();
    } while (newSlogan == currentSlogan);

    $('#slogan').fadeOut(function() {
      $(this).text(newSlogan).fadeIn();
    });
  }, 3000);
};

Deps.autorun(function() {
  Meteor.subscribe('ownUser');
});

function signIn() {
  var password = $('#password').val();
  var uname = $('#username').val();

  Meteor.loginWithPassword(uname, password, function(error) {
    if (error) {
      throwError(error.reason);
    }
  });
}

function signUp() {
  var password = $('#password').val();
  var password_confirmation = $('#password-confirmation').val();
  var uname = $('#username').val();

  if (password !== password_confirmation) {
    throwError('Passwords don\'t match!');
    return;
  } else if (!password) {
    throwError('You need to set the password up.');
    return;
  }

  Accounts.createUser({
    username: uname,
    password: password
  }, function(error) {
    if (error) {
      throwError(error.reason);
    } else {
      Meteor.loginWithPassword(uname, password);
      changeSignIn();
    }
  });
}

function changeSignIn() {
  $('#pass-confirm-div').fadeOut('medium');
  $('#sign-text').text('Sign In');
  $('.submit-button').text('Sign In');
  $('#sign-changer').text('Register');
  $('#sign-changer').attr('id','register-changer');
  $('#sign-type').val('sign-in');
}

function changeSignUp() {
  $('#pass-confirm-div').fadeIn('medium');
  $('#sign-text').text('Sign Up');
  $('.submit-button').text('Register');
  $('#register-changer').text('Sign In');
  $('#register-changer').attr('id','sign-changer');
  $('#sign-type').val('sign-up');
}
