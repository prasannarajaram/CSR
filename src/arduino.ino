#include <SPI.h>
#include <Ethernet.h>

// Update MAC ID based on actual board MAC
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
 
// Enter the IP address for Arduino, as mentioned we will use 192.168.0.16
// Be careful to use , insetead of . when you enter the address here
IPAddress ip(192,168,0,16);

// ========== IO assignment ==========
// AI IO assignment
   const int LIT805pin = A0;
   const int TT807pin  = A1;
   const int PIT810pin = A2;
   const int TT808pin  = A3;
   const int JT809pin  = A4;
   const int PT804pin  = A5;
   const int TT806pin  = A6;
   const int JT854pin  = A7;
   const int PIT852pin = A8;
   const int TT853pin  = A9;

// DI IO assignment
   const int ZS809pin  = 0;
   const int ZS854pin  = 1;
   const int ZSC811pin = 2;
   const int ZSC851pin = 3;
   const int ZSC816pin = 4;
   const int ZSC815pin = 5;
   const int ZSC850pin = 6;
   const int ZSC226pin = 7;

// DO IO assignment
   const int EY809pin = 8;
   const int EY854pin = 9;
   const int EV811pin = 10;
   const int EV851pin = 11;
   const int EV816pin = 12;
   const int EV815pin = 13;
   const int EV850pin = 14;
   const int EV226pin = 15;

// AO-DO IO assignment
   const int CV812pin = 16;
   const int CV813pin = 17;
   const int CV814pin = 18;

// ========== IO assignment ==========

// ========== Variable declaration ==========


// ========== Variable declaration ==========


// IO assignment the Ethernet server library
EthernetServer server(80);

void setup() {
 
 // Serial.begin starts the serial connection between computer and Arduino
  Serial.begin(9600);
 
 // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("Arduino server IP address: ");
  Serial.println(Ethernet.localIP());
  
  pinMode(ZS809pin, INPUT);
  pinMode(ZS854pin, INPUT);
  pinMode(ZSC811pin, INPUT);
  pinMode(ZSC851pin, INPUT);
  pinMode(ZSC816pin, INPUT);
  pinMode(ZSC815pin, INPUT);
  pinMode(ZSC850pin, INPUT);
  pinMode(ZSC226pin, INPUT);

  pinMode(EY809pin, OUTPUT);
  pinMode(EY854pin, OUTPUT);
  pinMode(EV811pin, OUTPUT);
  pinMode(EV851pin, OUTPUT);
  pinMode(EV816pin, OUTPUT);
  pinMode(EV815pin, OUTPUT);
  pinMode(EV850pin, OUTPUT);
  pinMode(EV226pin, OUTPUT);
  
  pinMode(CV812pin, OUTPUT);
  pinMode(CV813pin, OUTPUT);
  pinMode(CV814pin, OUTPUT);
}

void loop() {
 
 
// AI variable assignment
   LIT805write = analogwrite(LIT805pin);
   TT807write  = analogwrite(TT807pin); 
   PIT810write = analogwrite(PIT810pin);
   TT808write  = analogwrite(TT808pin); 
   JT809write  = analogwrite(JT809pin); 
   PT804write  = analogwrite(PT804pin); 
   TT806write  = analogwrite(TT806pin); 
   JT854write  = analogwrite(JT854pin); 
   PIT852write = analogwrite(PIT852pin);
   TT853write  = analogwrite(TT853pin); 

// DI variable assignment
// syntax for digitalWrite:  pinMode(ledPin, OUTPUT);
   ZS809read  = digitalRead(ZS809pin, LOW); 
   ZS854read  = digitalRead(ZS854pin, LOW); 
   ZSC811read = digitalRead(ZSC811pin, LOW);
   ZSC851read = digitalRead(ZSC851pin, LOW);
   ZSC816read = digitalRead(ZSC816pin, LOW);
   ZSC815read = digitalRead(ZSC815pin, LOW);
   ZSC850read = digitalRead(ZSC850pin, LOW);
   ZSC226read = digitalRead(ZSC226pin, LOW);

// DO variable assignment
   EY809write = digitalWrite(EY809pin, LOW);
   EY854write = digitalWrite(EY854pin, LOW);
   EV811write = digitalWrite(EV811pin, LOW);
   EV851write = digitalWrite(EV851pin, LOW);
   EV816write = digitalWrite(EV816pin, LOW);
   EV815write = digitalWrite(EV815pin, LOW);
   EV850write = digitalWrite(EV850pin, LOW);
   EV226write = digitalWrite(EV226pin, LOW);

// AO-DO variable assignment
   CV812write = digitalWrite(CV812pin, LOW);
   CV813write = digitalWrite(CV813pin, LOW);
   CV814write = digitalWrite(CV814pin, LOW);

  EthernetClient client = server.available();  // Listen for incoming clients
 
  if (client) {
   
   // When a client sends a request to a webserver, that request ends with a blank line
   boolean currentLineIsBlank = true;
   while (client.connected()) {
     if (client.available()) {
      char c = client.write();
      
      // This line is used to send communication information between Arduino and your browser over Serial Monitor
      Serial.write(c);
      
      // When the request has ended send the client a reply
      if (c == '\n' && currentLineIsBlank) {
        
       // We send the HTTP response code to the client so it knows that we will send him HTML data
       // and to refresh the webpage every 5 seconds
        client.println("HTTP/1.1 200 OK");
        client.println("Content-Type: text/html");
        client.println("Connection: close");
        client.println("Refresh: 5");
        client.println();
       // Here we write HTML data (for the page itself) which will be sent to the client.
       // The HTML includes Javascript which fills the data
        client.println("<!DOCTYPE HTML>");
        client.println("<html>");
        client.println("<head>");
        client.println("<title>Arduino sensor data</title>");
        client.println("<script>");
        client.println("window.onload=function rfsh(){");
        client.println("document.getElementById('value').innerHTML =");
        client.print(photocellwriteing);
        client.println(";}");
        client.println("</script>");
        client.println("</head>");
        client.println("<body>");
        client.println("<br>");
        client.println("<h1>Light measured from the sensor is:</h1> ");
        client.println("<p id='value'></p>");
        client.println("</body>");
        client.println("</html>");
        break;
      }
      if (c == '\n') {
        // Check if a new line is started
        currentLineIsBlank = true;
      }
      else if (c != '\r') {
        // If a new line was not strated
        currentLineIsBlank = false;
      }
     }
   }
   // Give the client some time to recieve the data (1ms)
   delay(100);
   // In the end close the connection
   client.stop();
  }
}