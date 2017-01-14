console.log('ooooohhhhhhooooohhh');
setTimeout(function() {
    console.log('Boo from phantom');
    phantom.exit();
}, 1000);