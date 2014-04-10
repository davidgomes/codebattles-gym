var nproblems = 2;
var problems = [];

for (var i = 0; i < nproblems; i++) {
  var filename = "problemset" + (i+1) + ".json";
  problems[i] = JSON.parse(Assets.getText(filename));
}

//helpers

getProblems = function() {
  return problems;
}
