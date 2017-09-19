#include <LBattery.h>
#include <LGSM.h>
#include <LGPS.h>
#include <LFlash.h>
#include <LSD.h>
#include <LStorage.h>

const char* TWILIO_NUM = "2936";
const int MSG_SIZE = 256;
char NUM_DELIMITER[] = "#-";

void getSMS(char* msg, int size);

// Put your setup code here
// This is ran once
void setup() {
  // Serial communication on the baud 9600
  Serial.begin(9600);
  LGPS.powerOn();
  Serial.println("LGPS powering on...");
  delay(3000);

  Serial.println("Initializing GSM");

  while (!LSMS.ready()) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nGSM ready.");

  if (LSMS.available()) {
    LSMS.flush();
    Serial.println("Flushed.");
  }
}

void loop() {
  if (LSMS.available()) {
    char* msg = (char*)malloc(sizeof(char) * 256);
    getSMS(msg);

    if (msg != NULL) {
      Serial.println(msg);
      int pos = search(msg, NUM_DELIMITER);
      String smsBody = String(msg).substring(2, pos) + "#-";
    
      // Battery level
      if (strstr(msg, "battery level")) {
        smsBody += String("My battery level is at " + String(LBattery.level()) + "%.");
      }

      sendSMS(smsBody.c_str());
      Serial.println(smsBody);
      free(msg);
    }
    LSMS.flush();
  }
}

void sendSMS(const char* msg) {
  // Set the Twilio shortcode as the recipient of the SMS
  LSMS.beginSMS(TWILIO_NUM);
  LSMS.print(msg);

  if (LSMS.endSMS()) {
    Serial.println("SMS successfully sent.");
  } else {
    Serial.println("SMS failed to send.");
  }
}

void getSMS(char* msg)
{
  int c = 0;
  int index = 0;
  char num[20] = {0};

  // number is stored into buf
  LSMS.remoteNumber(num, 20);

  while (true)
  {
    // message content (one byte at a time)
    c = LSMS.read();
    if (c < 0) {
      // enf of message content
      break;
    }
    else
    {
      msg[index] = (char)c;
      index++;
    }
  }

  msg[index + 1] = '\0';
}
