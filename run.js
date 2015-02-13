console.log('-------------------------------------------------------------------------');
    console.log('   phantom-lambda Started');
require('./index').handler(null, { done: function() {
    console.log('   phantom-lambda Completed');
    console.log('-------------------------------------------------------------------------');
}});
