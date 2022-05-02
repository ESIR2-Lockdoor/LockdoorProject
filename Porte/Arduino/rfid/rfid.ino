#include <SPI.h>
#include <RFID.h>
#define SS_PIN 10
#define RST_PIN 9
RFID rfid(SS_PIN, RST_PIN);
int relay = 8;  //Pin 8
String rfidCard;
void setup() {
  Serial.begin(9600);
  Serial.println("Starting the RFID Reader...");
  SPI.begin();
  rfid.init();
  pinMode(relay,OUTPUT);    // Define the port attribute as output 
}
boolean relay_state = false;
void loop() {
  if (rfid.isCard()) {
    if (rfid.readCardSerial()) {
      rfidCard = String(rfid.serNum[0]) + " " + String(rfid.serNum[1]) + " " + String(rfid.serNum[2]) + " " + String(rfid.serNum[3]);
      Serial.println(rfidCard);
      delay(500);
      if (rfidCard == "20 66 61 43") {
        if(relay_state){
          digitalWrite(relay,LOW);   // turn the relay ON
          relay_state = false;
          Serial.println("Porte fermee");

        }
        else{
          digitalWrite(relay,HIGH);   // turn the relay ON
          relay_state = true;
          Serial.println("Porte ouverte");
        }
      } else {
        Serial.println("Access denied");
      }
    }
    rfid.halt();
  }
}
