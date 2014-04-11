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
    clearKeyboardScript();
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
    keyboardScript();
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
  usingInteval = Meteor.setInterval(function() {
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
    Meteor.clearTimeout(usingInterval);
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
};
