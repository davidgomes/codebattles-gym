audio = null;

hazards = {
  pitaScript: {
    name: 'Pita Script',
    description: 'You\'re now a 12 years old girl.',
    difficulty: 10,

    execute: function() {
      editor.setOption('theme', 'girl');
      if (audio != null) {
        audio.pause();
      }
      audio = new Audio('music/pitascript.mp3');
      audio.loop = true;
      audio.play();
    }
  },

  russianRoulette: {
    name: 'Russian Roulette',
    description: 'A random line can removed every 10 seconds.',
    difficulty: 20,

    execute: function() {
      setInterval(function() {
        var shot = Math.floor(Math.random() * 6);

        if (shot === 1) {
          var line = Math.floor(Math.random() * editor.doc.lineCount() + 1);
          editor.removeLine(line);
        }
      }, 1000);
    }
  },

  warTrauma: {
    name: 'War Trauma',
    description: 'Random flashbang grenades.',
    difficulty: 10,

    execute: function() {
      var timeout = Math.floor(Math.random() * 10 + 1) * 100;
      setTimeout(this, timeout);
    }
  },

  keyboardMalfunction: {
    name: 'Keyboard Malfunction',
    description: 'Something is wrong with your keyboard.',
    difficulty: 40,

    execute: function() {
    }
  },

  keyboardMalfunction: {
    name: 'Perfectionist',
    description: 'Think B4 u code.',
    difficulty: 20,

    execute: function() {
    }
  },

  nearSighted: {
    name: 'Near-sighted',
    description: 'I give you one line.',
    difficulty: 30,

    execute: function() {
    }
  },

  farSighted: {
    name: 'Far-sighted',
    description: 'You are now a \"visgarolho\".',
    difficulty: 20,

    execute: function() {
    }
  }
};
