const mainFile = '\
#include <SimpleTimer.h>\n\
#include <ESP8266WiFi.h>\n\
#include <PubSubClient.h>\n\
#include <Adafruit_seesaw.h>\n\
\n\
bool DEBUG = true;\n\
\n\
/*** COMMUNICATION SETUP ***/\n\
\n\
// MQTT Info: Obtained from cloudMQTT\n\
const char *MQTT_SERVER = "[INSERT DATA]";\n\
const int MQTT_PORT = -1;\n\
const char *MQTT_USER = "[INSERT DATA]";\n\
const char *MQTT_PASSWORD = "[INSERT DATA]";\n\
const char *MQTT_CLIENT_NAME = "[INSERT DATA]";\n\
\n\
// MQTT Topics\n\
const char *PUB_TOPIC = "device_call/{{UNIT_ID}}";\n\
const char *SUB_TOPIC = "web_call/{{UNIT_ID}}";\n\
\n\
/// WiFi Network credentials\n\
const char* WIFI_SSID = "[INSERT DATA]";\n\
const char* WIFI_PASSWORD = "[INSERT DATA]";\n\
\n\
// Variables\n\
int PUMP_PIN = 10;\n\
int MOISTURE_POLL_MS = {{POLLING_PERIOD}} * 60 * 1000;\n\
\n\
// Declarations\n\
int timerId;\n\
SimpleTimer timer;\n\
WiFiClient espClient;\n\
PubSubClient client(MQTT_SERVER, MQTT_PORT, espClient);\n\
Adafruit_seesaw ss;\n\
\n\
void callback(char* topic, byte* payload, unsigned int length);\n\
\n\
void setup() {\n\
  Serial.begin(115200);\n\
  pinMode(PUMP_PIN, OUTPUT);\n\
  ss.begin(0x36);\n\
  timerId = timer.setInterval(MOISTURE_POLL_MS, readMoisture);\n\
}\n\
\n\
void loop() {\n\
  connectWifi();\n\
  connectPubSub();\n\
  if (WiFi.status() == WL_CONNECTED && client.connected()) {\n\
    client.loop();\n\
    timer.run();\n\
  }\n\
}\n\
\n\
void connectWifi() {\n\
  if (WiFi.status() != WL_CONNECTED) {\n\
    myPrint("Connecting to ");\n\
    myPrint(WIFI_SSID);\n\
    myPrintln("...");\n\
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);\n\
 \n\
    if (WiFi.waitForConnectResult() != WL_CONNECTED) {\n\
      return;\n\
    }\n\
    myPrintln("WiFi connected");\n\
  }\n\
}\n\
\n\
void connectPubSub() {\n\
  if (!client.connected()) {\n\
    myPrintln("Connecting to MQTT server");\n\
      \n\
    if (client.connect(MQTT_CLIENT_NAME, MQTT_USER, MQTT_PASSWORD)) {\n\
       myPrintln("Connected to MQTT server");       \n\
       client.setCallback(callback);\n\
       client.subscribe(SUB_TOPIC);   \n\
    } else {\n\
        myPrintln("Could not connect to MQTT server");   \n\
    }\n\
  }\n\
}\n\
\n\
// Executed when a message is read from MQTT\n\
void callback(char* topic, byte* payload, unsigned int len) {  \n\
  printMessage(topic, payload, len);\n\
  parseAndDispatchMessage(payload, len);\n\
}\n\
\n\
void parseAndDispatchMessage(byte* payload, unsigned int len) {\n\
  char isRead = ((char)payload[0] == \'R\');\n\
  char command = (char)payload[1];\n\
  char value[16] = "";\n\
  \n\
  for (int i = 2; i < len; i++) {\n\
    value[i - 2] = (char)payload[i]; \n\
  }\n\
  control(isRead, command, value);\n\
}\n\
\n\
\n\
/*\n\
 * control:\n\
 * Executes the appropriate control based on the given command\n\
 * isRead: True if the command is a "read" command (e.g. reading temp)\n\
 *         False if it is a "write" command (e.g. moving a motor)\n\
 * command: Character that denotes the sensor/actuator being triggered\n\
 *          M = moisture sensor, W = water pump, P = poll period\n\
 * value: String denoting the actual value being sent to an actuator (writing only)\n\
*/\n\
void control(bool isRead, char command, char* value) {\n\
  if (command == \'W\') {\n\
    int delayMs = atoi(value);\n\
    triggerPump(delayMs);\n\
  } else if (command == \'M\') {\n\
    readMoisture();\n\
    timer.restartTimer(timerId);\n\
  } else if (command == \'P\') {\n\
    int pollPeriodMinutes = atoi(value);\n\
    setPollPeriod(pollPeriodMinutes);\n\
  }\n\
}\n\
\n\
void triggerPump(int delayMs) {\n\
  digitalWrite(PUMP_PIN, HIGH);\n\
  delay(delayMs);\n\
  digitalWrite(PUMP_PIN, LOW);\n\
}\n\
\n\
void readMoisture() {\n\
  float tempC = ss.getTemp();\n\
  uint16_t capread = ss.touchRead(0);\n\
  printMoistureValues(tempC, capread);\n\
  publishMoistureValues(tempC, capread);\n\
}\n\
\n\
void publishMoistureValues(float tempC, uint16_t capread) {\n\
  char result[10] = "";\n\
  sprintf(result, "%.2f,%d", tempC, capread);\n\
  char msg[12] = "";\n\
  sprintf(msg,"%s%s", "M", result);\n\
  client.publish(PUB_TOPIC, msg); \n\
}\n\
\n\
void setPollPeriod(int minutes) {\n\
  timer.deleteTimer(timerId);\n\
  MOISTURE_POLL_MS = minutes * 60 * 1000;\n\
  timerId = timer.setInterval(MOISTURE_POLL_MS, readMoisture);\n\
}\n\
\n\
\n\
\n\
/*** PRINTING CENTER ***/\n\
\n\
void printMessage(char* topic, byte* payload, unsigned int len) {\n\
  if (DEBUG) {\n\
    Serial.print("Message arrived [");\n\
    Serial.print(topic);\n\
    Serial.print("] ");\n\
    for (int i = 0; i < len; i++) {\n\
      Serial.print((char)payload[i]);\n\
    }\n\
    Serial.println(); \n\
  }\n\
}\n\
\n\
void printMoistureValues(float tempC, uint16_t capread) {\n\
  if (DEBUG) {\n\
    Serial.print("Temperature: "); Serial.print(tempC); Serial.println("*C");\n\
    Serial.print("Capacitive: "); Serial.println(capread);  \n\
  }\n\
}\n\
\n\
void myPrint(String message) {\n\
  if (DEBUG) {\n\
    Serial.print(message);\n\
  }\n\
}\n\
\n\
void myPrintln(String message) {\n\
  if (DEBUG) {\n\
    Serial.println(message);\n\
  }\n\
}\n\
';

export { mainFile };