var fx = require('./hello-bot');
var messages = require('./test/sample-messages.js');

var genContext = function () {
    var context = {};
    context.bindings = {};
    context.req = { /* TODO: stubbed because this is ignored in code right now... */ };
    context.res = {};
	context.log = function (message) {
        console.log(message);
    };
    context.done = function (err, output) {
        var values = {};

        console.log('Done!');
        if (err) {
            console.err('Error occurred:');
            console.err(err);
        } else { 
            if (context.res) {
                context.bindings.res = context.res;
            }
            for (var name in context.bindings) {
                values[name] = context.bindings[name];
            }
        }

        console.log('Results:')
        console.log(JSON.stringify(values, null, ' '));
    }
    return context;
}

fx(genContext(), { body: messages['intro']});
fx(genContext(), { body: messages['name']});