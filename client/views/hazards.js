hazards = {
  pitaScript: {
    name: 'pitaScript',
    description: 'You\'re now a 12 years old girl',
    rank: 10,

    execute: function() {
      editor.setOption('theme', 'girl');
    }
  },

  russianRoulette: {
    name: 'russianRoulette',
    description: 'Hello',
    rank: 20,

    execute: function() {
      var shot = Math.floor(Math.random() * 3);

      if (shot === 1) {
        var line = Math.floor(Math.random() * editor.doc.lineCount() + 1);
        editor.removeLine(line);
      }

      setTimeout(this, 3000);
    }
  }
};
