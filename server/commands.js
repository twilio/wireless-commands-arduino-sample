module.exports = (() => {
    'use strict';
    
    const twilioLibrary = require('twilio'),
          config        = require('./config.js'),
          _             = require('lodash'),
          client        = new twilioLibrary.Twilio(config.accountSid, config.authToken);
    
    function sendCommand(command) {
        if (_.isEmpty(command)) return;
        
        client.wireless.commands.create({
            device: config.simUniqueName,
            command: command
        });
    }
    
    function sendSMS(to, msg) {
        if (_.isEmpty(to) || _.isEmpty(msg)) return;
        
        client.messages.create({
          from: config.devicePhoneNumber,
          to: to,
          body: msg
        }, (err, message) => {
            if (err) console.log(err.message);
        });
    }
    
    return {
        sendCommand,
        sendSMS
    };
})();