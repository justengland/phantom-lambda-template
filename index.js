// Entry Point
exports.handler = function( event, context ) {
  "use strict";

  var path = require('path'),
      fs = require('fs'),
      http = require('http'),
      phantomDownloadPath = "https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64-symbols.tar.bz2",
      childProcess = require('child_process');

  // Get the path to the phantomjs application
  function getPhantomFileName() {
    return path.join(__dirname, 'phantomjs')
  }

  // Call the phantomjs script
  function callPhantom(callback) {
    var binPath = path.join(__dirname, 'phantomjs');
    var childArgs = [
      path.join(__dirname, 'phantomjs-script.js'),
      'some other argument (passed to phantomjs script)'
    ];

    console.log('<<<<---------  Phantom Started  '+ binPath +'--------->>>>');
    var ls = childProcess.execFile(binPath, childArgs);

    ls.stdout.on('data', function (data) {    // register one or more handlers
      console.log(data);
    });

    ls.stderr.on('data', function (data) {
      console.log('stderr  ---:> ' + data);
    });

    ls.on('exit', function (code) {
      console.log('child process exited with code ' + code);
      callback();
    });
  }

  // Execute the phantom call and exit
  callPhantom(function() {
    context.done();
  });
}
