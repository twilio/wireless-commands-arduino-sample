# Send Commands to an Arduino device

Use Twilio's Programmable SMS as an interface to your Arduino. The body of the text message hits the sample Node.JS code which sends a Programmable Wireless [Command](https://www.twilio.com/docs/api/wireless/rest-api/command) to an [Ardunio](https://www.sparkfun.com/arduino_guide) device asking for it's current battery level, and then returns the results to the original sender.

# How's it work?
The Command resource enables you to exchange simple machine-to-machine messages with SMS-capable Devices. For example, you could use a Command to tell an idle device to enable its data capabilities and establish an IP session. In this sample, we'll send a message to an Android device asking it to return its battery level.

Commands can be sent and received using the SMS text mode or binary (PDU) mode. Text mode Commands have a maximum length of 100 single-byte characters. Binary mode Commands have a maximum length of 140 bytes. To process a Command when it reaches your Arduino, you will interface with the modem directly. From the perspective of the Arduino, a Command is delivered as a regular SMS message.

# Requirements
* [Programmable Wireless SIM Card](https://www.twilio.com/console/wireless/sims/orders/new)
* [Programmable Phone Number](https://www.twilio.com/phone-numbers)
* [Arduino](https://www.sparkfun.com/arduino_guide) board with GPS and cellular module
* [Arduino IDE](https://www.arduino.cc/en/main/software)
* Server running [Node.js v6.11+](https://nodejs.org/en/)
	* Local: [Ngrok](https://ngrok.com/)
	* Public: [Heroku](https://heroku.com/)

# Setup instructions

## Server
1. Clone or download this repository
2. Open `config.js` with your favorite text editor
3. Update all values with the `{{ YOUR_X_HERE }}` convention
4. See table below
5. Upload code to server

## Values to update in config.js

Key | Description
---------- | -----------
accountSid | Consider this your account username. It’s used to authenticate - [get it here.](https://www.twilio.com/console/)
authToken | Consider this your account password. It’s used to authenticate - [get it here.](https://www.twilio.com/console/)
phoneNumber | Used for bidirectional communication with the Arduino device - [get one here.](https://www.twilio.com/console/phone-numbers/search)
simUniqueName | This is the unique name of your SIM resource - [get it here.](https://www.twilio.com/console/wireless/sims)

## For the Programmable Wireless SIM
1. Navigate to the [Programmable Wireless SIMs](https://www.twilio.com/console/wireless/sims)
2. Select your newly created SIM
3. Enter the Callback URL that points to the code you uploaded to your server.
	* Ngrok Example: https://NGROK-GENERATED-NAME.ngrok.io/api/v1/callback
	* Heroku Example: https://YOUR-APP-NAME-HERE.com/api/v1/callback
4. Click Save

## For the Arduino
1. Open Arduino IDE
2. Go to File > Open in the Menu
3. Navigate to your local copy of the arduino folder from this repository
4. Select `wireless-sms-template.ino`
5. Select your Arduino board under Tools in the Menu
6. Select the correct Port under Tools in the Menu
7. Press the Right Arrow Button in Arduino IDE to upload the code
8. Select Serial Monitor under Tools in the Menu
9. Send a SMS with the text: `battery level`
10. Wait for response

***That’s it! Happy Hacking!***

# Resources
* [Programmable Wireless Documentation](https://www.twilio.com/docs/api/wireless)
* [Programmable Wireless Product Page](https://www.twilio.com/wireless)
* [Programmable Wireless Pricing](https://www.twilio.com/wireless/pricing)
