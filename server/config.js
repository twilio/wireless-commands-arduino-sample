module.exports = (() => {
    'use strict';

    return {
        // Service api URIs prefix
        apiPrefixUri: '/api/v1',
        // Twilio Credentials
        // https://www.twilio.com/console
        accountSid: '{{ YOUR_ACCOUNT_SID_HERE }}',
        authToken: '{{ YOUR_AUTH_TOKEN_HERE }}',
        // https://www.twilio.com/console/phone-numbers/incoming
        devicePhoneNumber: '{{ YOUR_TWILIO_NUMBER_HERE }}',
        // Commands API
        // https://www.twilio.com/console/wireless/sims
        simUniqueName: '{{ YOUR_SIM_NAME_HERE }}',
    };
})();