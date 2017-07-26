'use strict';

const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      _             = require('lodash'),
      commands      = require('./commands.js'),
      config        = require('./config.js');

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000));

app.post(config.apiPrefixUri + '/callback', (req, res) => {
    if (_.isEmpty(req.body)) {
        res.sendStatus(204);
        return;
    }
    
    let body = req.body.Command;
    /* Note: We're storing the phone numbers in the text messages so that we don't need to maintain a database. */
    let pos = body.search('#-');
    let to = body.substring(0, body.search('#-'));
    let msg = body.substr(pos + 2);

    commands.sendSMS(to, msg);
    res.sendStatus(200);
});

app.post(config.apiPrefixUri + '/sms', (req, res) => {
    if (_.isEmpty(req.body)) {
        res.sendStatus(204);
        return;
    }
    /* Note: We're storing the phone numbers in the text messages so that we don't need to maintain a database. */
    let body = `-#${req.body.From}#-${req.body.Body}`;
    commands.sendCommand(body);
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}: listening...`);
});