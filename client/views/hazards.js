hazards = {
  pitaScript: {
    name: 'Pita Script',
    description: 'You\'re now a 12 years old girl',
    difficulty: 10,

    execute: function() {
      editor.setOption('theme', 'girl');
    }
  },

  russianRoulette: {
    name: 'Russian Roulette',
    description: 'Every 10s - 1/6 chance to delete a random line',
    difficulty: 20,

    execute: function() {
      var shot = Math.floor(Math.random() * 6);

      if (shot === 1) {
        var line = Math.floor(Math.random() * editor.doc.lineCount() + 1);
        editor.removeLine(line);
      }

      setTimeout(this, 10000);
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
    description: 'I give one line.',
    difficulty: 40,

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
