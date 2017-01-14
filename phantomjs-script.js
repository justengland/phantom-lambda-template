console.log('start phantom');
setTimeout(function() {
    console.log('Boo from phantom');
    phantom.exit();
}, 1000);