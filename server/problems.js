var nproblems = 2;
var problems = [];

var current = 0;
for (var i = 0; i < nproblems; i++) {
  var filename = "problemset" + (i + 1) + ".json";
  problems[i] = JSON.parse(Assets.getText(filename));

  for (var j = 0; j < problems[i].length; j++) {
    problems[i][j].id = current++;
  }
}

// Helpers

getProblemById = function(id) {
  for (var i = 0; i < nproblems; i++) {
    for (var j = 0; j < problems[i].length; j++) {
      if (problems[i][j].id == id) {
        return problems[i][j];
      }
    }
  }

  return -1;
};

getProblemByRank = function(rank) {
  if ((rank > nproblems) || (rank < 1)) {
    rank = nproblems;
  }

  var index = Math.floor((Math.random() * problems[rank - 1].length));
  return problems[rank - 1][index];
};

getProblems = function() {
  return problems;
};

Meteor.methods({
  getProbInputById: function(id,n) {
    console.log("MOTHAFUCKAH");
    console.log(problems[id - 1].io[n].input);
    return problems[id - 1].io[n].input;
  },

  getProbOutputById: function(id,n) {
    return problems[id - 1].io[n].output;
  },

  getNTestCases: function(id) {
    return problems[id - 1].io.length;
  }
});
