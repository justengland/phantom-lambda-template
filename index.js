// Entry Point
exports.handler = function( event, context ) {
  "use strict";

  var path = require('path'),
      fs = require('fs'),
      os = require('os'),
      http = require('http'),
      phantomDownloadPath = "https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64-symbols.tar.bz2",
      childProcess = require('child_process');

  // Get the path to the phantomjs application
  function getPhantomFileName(callback) {
    var nodeModulesPath = path.join(__dirname, 'node_modules');
    fs.exists(nodeModulesPath, function(exists) {
      if (exists) {
        callback(path.join(__dirname, 'node_modules','phantomjs', 'bin', 'phantomjs'));
      }
      else {
        callback(path.join(__dirname, 'phantomjs'));
      }
    });
  }

  // Call the phantomjs script
  function callPhantom(callback) {
    getPhantomFileName(function(phantomJsPath) {
      
      var childArgs = [
        path.join(__dirname, 'phantomjs-script.js')
      ];
      
      // replace default phantomjs script with something the invoker sent
      if (event && event.code) {
        childArgs[0] = generateTmpScript()
      }

      // This option causes the shared library loader to output
      // useful information if phantomjs can't start.
      process.env['LD_WARN'] = 'true';

      // Tell the loader to look in this script's directory for
      // the shared libraries that Phantom.js 2.0.0 needs directly.
      // This shouldn't be necessary once
      // https://github.com/ariya/phantomjs/issues/12948
      // is fixed.
      process.env['LD_LIBRARY_PATH'] = __dirname;

      console.log('Calling phantom: ', phantomJsPath, childArgs);
      var ls = childProcess.execFile(phantomJsPath, childArgs);
  
      ls.stdout.on('data', function (data) {    // register one or more handlers
        console.log(data);
      });
  
      ls.stderr.on('data', function (data) {
        console.log('phantom error  ---:> ' + data);
      });
  
      ls.on('exit', function (code) {
        console.log('child process exited with code ' + code);
        callback();
      });
      
    });
  }

  function generateTmpScript() {
    // when running locally context.json might not contain invokeid
    let filename = path.join(os.tmpdir(), (context.invokeid || Date.now()) + '.js')
    fs.writeFileSync(filename, event.code)

    return filename
  }

  // Execute the phantom call and exit
  callPhantom(function() {
    context.done();
  });
}
