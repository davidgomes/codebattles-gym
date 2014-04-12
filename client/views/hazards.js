function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return min + (max - min) * Math.random();
}

usingInterval = null;
var clippyTimeout;

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
  else if (hazard.name == "Markee") {
    clearMarkeeScript();
  }
  else if (hazard.name == "Cube") {
    clearCubeScript();
  }
  else if (hazard.name == "Clippy") {
    clearClippyScript();
  }
  else if (hazard.name == "Spicy") {
    clearSpicyScript();
  }
  else if (hazard.name == "LSD") {
    clearLsdScript();
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
  else if (hazard.name == "Markee") {
    markeeScript();
  }
  else if (hazard.name == "Cube") {
    cubeScript();
  }
  else if (hazard.name == "Clippy") {
    clippyScript();
  }
  else if (hazard.name == "Spicy") {
    spicyScript();
  }
  else if (hazard.name == "LSD") {
    lsdScript();
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

  if (!mute) {
    gameAudio.pause();
    audio.play();
  }
};

clearPitaScript = function() {
  if (audio != null) {
    audio.pause();
  }

  if (!mute) {
    gameAudio.play();
  }

  $('body').removeClass("girl");
  editor.setOption('theme', 'mbo');
};

russianScript = function() {
  usingInterval = Meteor.setInterval(function() {
    var line = Math.floor(Math.random() * editor.doc.lineCount() + 1);
    editor.removeLine(line);
  }, 5000);
};

clearRussianScript = function() {
  if (usingInterval) {
    Meteor.clearInterval(usingInterval);
  }
};

warScript = function() {
  /*  var $fdiv = $("<div>", {id: "flashbang"});
   $("body").append($fdiv);
   $("#flashbang").hide();
   var flashbangAudio = new Audio('fx/flashbang.mp3');
   var timeout = 3500;
   usingInterval = Meteor.setInterval(function() {
   flashbangAudio.play();
   setTimeout(function() {
   $("#flashbang").show().fadeOut(4000);;
   }, 1700);
   timeout = Math.floor(Math.random() * 4500 + 3500);
   },timeout);*/
};

clearWarScript = function () {
  /*if (usingInterval) {
   Meteor.clearTimeout(usingInterval);
   }*/
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
  keyboardHazard2 = false;
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

  $('body').css("background", "rgba(236, 240, 241,1.0)");
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

cubeScript = function() {
  usingInterval = setInterval(function() {
    var cubeId = getRandomInt(0, 9999);
    var cubeName = '#cube' + cubeId;

    $('body').append('<div id="cube' + cubeId + '" class="codebits-cube"></div>');

    $(cubeName).css('background', 'url("fx/cube.png")');
    $(cubeName).css('position', 'fixed');
    $(cubeName).css('width', '397px');
    $(cubeName).css('height', '447px');
    $(cubeName).css('left', getRandomInt(0, 900) + 'px');
    $(cubeName).css('top', getRandomInt(0, 200) + 'px');
    $(cubeName).css('z-index', '5');

    var rotateAngle = getRandomInt(0, 360);
    var scaleLevel = getRandomFloat(0.4, 1.2);

    $(cubeName).css('transform', 'rotate(' + rotateAngle + 'deg) scale(' + scaleLevel + ')');
    $(cubeName).css('-webkit-transform', 'rotate(' + rotateAngle + 'deg) scale(' + scaleLevel + ')');

    $(cubeName).click(function() {
      $(this).toggle();
      editor.focus();
    });
  }, 2500);
};

clearCubeScript = function() {
  $('.codebits-cube').hide();
  clearInterval(usingInterval);
};

markeeScript = function() {
  var statementDiv = $('#statement-div');
  statementDiv.html("<marquee class=\"bomb\" behavior=\"left\" loop=\"infinite\">" + cstatement.toUpperCase() + "</marquee>");
};

clearMarkeeScript= function() {
  var statementDiv = $('#statement-div');
  statementDiv.html("<p><em id=\"problem-statement\">" + cstatement + "</em></p>");
};

var clippyMessages = ["Estou aqui para ajudar. Em que posso ser útil?",
                      "Olá companheiro! Já experimentaste o Ink?",
                      "Sabias que podes fazer pagamentos com a MEO Wallet?",
                      "Vem aí o Inverno!",
                      "Troca euros virtuais por chocolates na vending machine do lobby.",
                      "Sabias que os pokemon da água são especialmente fortes contra os do fogo?"];


clippyScript = function() {
  $('#actual-editor').append('<div id="clippy-holder"></div>');
  $('#clippy-holder').append('<div id="clippy"></div>');
  $('#clippy-holder').append('<div id="baloon"></div>');
  submitEnabled = false;

  editor.setOption('readOnly', true);

  $('#baloon').css('background', 'url("fx/baloon.png")');
  $('#baloon').css('position', 'absolute');
  $('#baloon').css('width', '371px');
  $('#baloon').css('height', '138px');
  $('#baloon').css('right', '410px');
  $('#baloon').css('bottom', '115px');

  $('#baloon').html('<p id="baloon-text">' + clippyMessages[Math.floor(Math.random() * clippyMessages.length)] + '</p>');

  $('#clippy').css('background', 'url("fx/clippy.png")');
  $('#clippy').css('position', 'absolute');
  $('#clippy').css('width', '141px');
  $('#clippy').css('height', '130px');
  $('#clippy').css('right', '410px');
  $('#clippy').css('bottom', '10px');
  $('#clippy').css('z-index', '6');

  $('#clippy-holder').click(function() {
    submitEnabled = true;
    $(this).remove();
    editor.setOption('readOnly', false);
    editor.focus();
    clippyTimeout = setTimeout(clippyScript, getRandomInt(5000, 10000));
  });
};

clearClippyScript = function() {
  $("#clippy-holder").remove();
  submitEnabled = true;
  clearTimeout(clippyTimeout);
  editor.setOption('readOnly', false);
  editor.focus();
};


spicyScript = function() {
  $('body').append('<div onselectstart="return false;" ondragstart="return false;" unselectable="on" id="spicy"></div>');

  $('#spicy').css('background', 'red');
  $('#spicy').css('width', '100%');
  $('#spicy').css('height', '100%');
  $('#spicy').css('position', 'fixed');
  $('#spicy').css('top', '0px');
  $('#spicy').css('left', '0px');
  $('#spicy').css('z-index', '7');
  $('#spicy').css('opacity', '0.05');
  $('#spicy').css('-webkit-user-select', 'none');
  $('#spicy').css('user-select', 'none');

  $('#spicy').append('<div id="radioactive"></div>');
  $('#radioactive').css('background', 'url("fx/spicy.png")');
  $('#radioactive').css('margin', 'auto');
  $('#radioactive').css('position', 'absolute');
  $('#radioactive').css('width', '600px');
  $('#radioactive').css('height', '525px');
  $('#radioactive').css('top', '0px');
  $('#radioactive').css('left', '0px');
  $('#radioactive').css('right', '0px');
  $('#radioactive').css('bottom', '0px');
  $('#radioactive').css('-webkit-user-select', 'none');
  $('#radioactive').css('user-select', 'none');

  $('#radioactive').click(function() {
    editor.focus();
  });
  
  editor.focus();
  usingInterval = setInterval(function() {
    var currentOpacity = parseFloat($('#spicy').css('opacity'));
    $('#spicy').css('opacity', currentOpacity + 0.01);
  }, 100);
};

clearSpicyScript = function() {
  clearInterval(usingInterval);
  $('#spicy').remove();
};

lsdScript = function() {
  $('body').css('background', 'url("fx/lsd.gif")');
  $('body').css('background-position', 'center');
  $('#actual-editor').css('opacity', '0.85');
};

clearLsdScript = function() {
  $('body').css('background', 'rgba(236, 240, 241,1.0)');
  $('body').css('background-position', 'left top');
  $('#actual-editor').css('opacity', '1');  
};
