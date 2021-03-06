function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

var Evaluator = (function() {
  if (typeof(String.prototype.trim) === 'undefined') {
    String.prototype.trim = function() {
      return String(this).replace(/^\s+|\s+$/g, '');
    };
  }

  return {
    escape: function(str) {
      return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    },

    run: function(code, language, probNum, callback) {
      var command;
      var input;
      var output;

      code = this.escape(code);

      input = getProblemById(probNum).io[0].input;
      output = getProblemById(probNum).io[0].output;

      if (language === 'python') {
        command = 'python -c "' + code + '"';
      } else if (language === 'ruby') {
        command = 'ruby -e "' + code + '"';
      } else if (language === 'javascript') {
        command = 'js24 -e "' + code + '"';
      }

      var options = { encoding: 'utf8', maxBuffer: 100 * 1024, killSignal: 'SIGTERM' };

      var userId = makeId();
      if (input.length > 0) {
        var tcommand = 'printf "' + input + '" > ' + userId + '.txt';
        var child = exec(tcommand, function(error, stdout, stderr) { });
        command += ' < ' + userId + '.txt';
      }

      var fcommand = "isolate -t 1 -e --run -- " + command;
      child = exec(fcommand, options, function(error, stdout, stderr) {
        var response;

        if (error) {
          response = stderr.toString();
        } else {
          if (stdout.toString() === output) {
            response = 'Accepted';
          } else {
            response = 'Wrong Answer';
          }
        }

        callback(response);
      });
    }
  };
}());

var Future = Npm.require('fibers/future');
var exec = Npm.require('child_process').exec;

Meteor.startup(function() { });

Meteor.methods({
  runCode: function(code, language, probNum) {
    var future = new Future();

    Evaluator.run(code, language, probNum, function(response) {
      future.return(response);
    });

    return future.wait();
  }
});
