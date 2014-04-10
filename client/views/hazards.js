russianRoulette = function() {
  var shot = Math.floor((Math.random() * 3));

  if (shot === 1) {
    var line = Math.floor(Math.random() * editor.doc.lineCount() + 1);
    editor.removeLine(line);
  }

  setTimeout(russianRoulette, 3000);
}

pitaScript = function() {
  editor.setOption('theme', 'girl');
}
