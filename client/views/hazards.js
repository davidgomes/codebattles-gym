usingInteval = null;

clearHazard = function(hazard) {
  if (hazard == null)
    return;
  
  if (hazard.name == "No Hazard") {
    clearNoScript();
  }
  else if (hazard.name == "Pita Script") {
    clearPitaScript();
  }
  else if (hazard.name == "Russian Roulette") {
    clearRussianScript();
  }
  else if (hazard.name == "War Trauma") {
    clearWarScript();
  }
  else if (hazard.name == "Keyboard Malfunction") {
    clearKeyboardMalfunctionScript();
  }
  else if (hazard.name == "Perfectionist") {
    clearPerfectScript();
  }
  else if (hazard.name == "Near-sighted") {
    clearNearScript();
  }
  else if (hazard.name == "Far-sighted") {
    clearFarScript();
  }
  else if (hazard.name == "Vertigo") {
    clearVertigoScript();
  }
  else if (hazard.name == "Drunk") {
    clearDrunkScript();
  }
  else if (hazard.name == "Align: center") {
    clearAlignCenterScript();
  }
  else if (hazard.name == "Big big text") {
    clearBigTextScript();
  }
};

runHazard = function(hazard) {
  if (hazard.name == "No Hazard") {
    noScript();
  }
  else if (hazard.name == "Pita Script") {
    pitaScript();
  }
  else if (hazard.name == "Russian Roulette") {
    russianScript();
  }
  else if (hazard.name == "War Trauma") {
    warScript();
  }
  else if (hazard.name == "Keyboard Malfunction") {
    keyboardMalfunctionScript();
  }
  else if (hazard.name == "Perfectionist") {
    perfectScript();
  }
  else if (hazard.name == "Near-sighted") {
    nearScript();
  }
  else if (hazard.name == "Far-sighted") {
    farScript();
  }
  else if (hazard.name == "Vertigo") {
    vertigoScript();
  }
  else if (hazard.name == "Drunk") {
    drunkScript();
  }
  else if (hazard.name == "Align: center") {
    alignCenterScript();
  }
  else if (hazard.name == "Big big text") {
    bigTextScript();
  }
};

noScript = function() {
};

clearNoScript = function() {
};


pitaScript = function() {
  editor.setOption('theme', 'girl');
  $('body').addClass("girl");
  if (audio != null) {
    audio.pause();
  }
  audio = new Audio('music/pitascript.mp3');
  audio.loop = true;
  audio.play();
};

clearPitaScript = function() {
  if (audio != null) {
    audio.pause();
  }
  audio = null;
  $('body').removeClass("girl");
  editor.setOption('theme', 'mbo');
};


russianScript = function() {
  usingInterval = Meteor.setInterval(function() {
    var shot = Math.floor(Math.random() * 2);

    if (shot === 1) {
      var line = Math.floor(Math.random() * editor.doc.lineCount() + 1);
      editor.removeLine(line);
    }
  }, 5000);
};

clearRussianScript = function() {
  if (usingInterval) {
    Meteor.clearInterval(usingInterval);
  }
};


warScript = function() {
  var timeout = Math.floor(Math.random() * 10 + 1) * 100;
  usingInterval = Meteor.setInterval(function() {
  }, timeout);
};

clearWarScript = function() {
  if (usingInterval) {
    Meteor.clearInterval(usingInterval);
  }
};


keyboardMalfunctionScript = function() {
  keyboardHazard1 = true;
};

clearKeyboardMalfunctionScript = function() {
  keyboardHazard1 = false;
};


perfectScript = function() {
  keyboardHazard2 = true;
};

clearPerfectScript = function() {
  keyboardHazard2 = true;
};


nearScript = function() {
};

clearNearScript = function() {
};


farScript = function() {
};

clearFarScript = function() {
};


vertigoScript = function() {
  $(".CodeMirror").addClass('mirror');
};


clearVertigoScript = function() {
  $(".CodeMirror").removeClass('mirror');
};


epilepsiaScript = function() {
  var colors = ["red", "green", "yellow", "green", "orange", "blue", "pink", "black"];
  usingInterval = Meteor.setInterval(function() {
    var index = Math.floor(Math.random() * colors.length);
    $('body').css("background-color", colors[index]);
  }, 30);
};

clearEpilepsiaScript = function() {
  if (usingInterval) {
    Meteor.clearTimeout(usingInterval);
  }
  $('body').css("background","rgba(236, 240, 241,1.0)");
};


drunkScript = function() {
  blurLevel = 0;
  blurInterval = 0.5;
  increasing = true;
  usingInterval = Meteor.setInterval(function() {
    if (blurLevel > 3) {
      increasing = false;
    } else if (blurLevel < blurInterval) {
      increasing = true;
    } if (increasing) {
      blurLevel += blurInterval;
    } else {
      blurLevel -= blurInterval;
    }
    $('.CodeMirror').css("-webkit-filter", "blur(" + blurLevel + "px)");
  }, 20);
};

clearDrunkScript = function() {
  if (usingInterval) {
    Meteor.clearTimeout(usingInterval);
  }
  $('.CodeMirror').css("-webkit-filter", "blur(0px)");
};


alignCenterScript = function() {
  $('.CodeMirror').css("text-align", "center");
};

clearAlignCenterScript = function() {
  $('.CodeMirror').css("text-align", "left");
};

bigTextScript = function() {
  $('.CodeMirror').css("font-size", "64px");
};

clearBigTextScript = function() {
  $('.CodeMirror').css("font-size", "14px");
};
