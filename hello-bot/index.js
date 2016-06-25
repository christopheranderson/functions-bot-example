var builder = require('botbuilder');

var bot = new builder.BotConnectorBot();

bot.add('/', new builder.CommandDialog()
    .matches('^set name', builder.DialogAction.beginDialog('/profile'))
    .matches('^quit', builder.DialogAction.endDialog())
    .onDefault([
        function (session, args, next) {
            if (!session.userData.name) {
                session.beginDialog('/profile');
            } else {
                next();
            }
        },
        function (session, results) {
            session.send('Hello %s!', session.userData.name);
        }
    ]));
bot.add('/profile', [
    function (session) {
        if (session.userData.name) {
            builder.Prompts.text(session, 'What would you like to change it to?');
        } else {
            builder.Prompts.text(session, 'Hi! What is your name?');
        }
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

bot.on('error', function(message) {
    console.log(message);
})

var listen = bot.listen();

var response = function(context) {
    return {
        send: function(status, message) {
            var _msg = message ? message : (typeof status !=='number' ? status : null)
            var _status = typeof status === 'number' ? status : 200
            var res = {
                status: _status,
                body: _msg
            };
            context.res = res;
            context.done();
        }
    }
}

module.exports = function(context, req) {
    listen(req, response(context))
}