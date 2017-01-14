console.log('start phatom');
setTimeout(function() {
    console.log('Boo from phantom');
    phantom.exit();
}, 1000);