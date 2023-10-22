#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include "WiFi.h"
#include "RTClib.h"
#include "SPIFFS.h"
#include <EEPROM.h>
#include <ESPmDNS.h>
#include <ModbusRTU.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>
#include "ESPAsyncWebServer.h"

AsyncWebServer server(80);

DynamicJsonDocument jsonSetting(2048);
DynamicJsonDocument networks(512);

IPAddress localIp;
IPAddress gateway;
IPAddress subnet;

String token;
String userClient[5];
String adminClient[5];
int userTokenIndex = 0;
int adminTokenIndex = 0;

void setup() {
  Serial.begin(115200);
  int numberOfNetworks = WiFi.scanNetworks();
  for (int i = 0; i < numberOfNetworks; ++i) {
    networks[String(i)]["ssid"] = WiFi.SSID(i);
  }     
      
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS.");                                                       
    return;                                                                                                           
  }        
  Serial.println("SD begin.");
  if (!SD.begin()) {
    Serial.println("Card Mount Failed.");
    //return;
  }                                                                                                            
  if (!readFile(SPIFFS, "/setting.json", jsonSetting)) {
    jsonSetting["wifiMode"] = "ap";
    jsonSetting["ssid"] = "";
    jsonSetting["wifiPassword"] = "";
    jsonSetting["apName"] = "ESP32";
    jsonSetting["apPassword"] = "";
    jsonSetting["ipMode"] = "dhcp";
    jsonSetting["dnsName"] = "ESP32";
    jsonSetting["localIp"] = "";
    jsonSetting["gateway"] = "";
    jsonSetting["subnet"] = "";
    jsonSetting["project"] = "none";
    jsonSetting["ssidList"] = networks;
  } else {
    jsonSetting["ssidList"] = networks;
    File file = SPIFFS.open("/setting.json", FILE_WRITE);
    serializeJson(jsonSetting, file);
    file.close();
  }

  if (jsonSetting["ipMode"] == "static") {
    bool boolLocalIp = localIp.fromString((jsonSetting["localIp"].as<const char*>()));
    bool boolGateway = gateway.fromString((jsonSetting["gateway"].as<const char*>()));
    bool boolSubnet = subnet.fromString((jsonSetting["subnet"].as<const char*>()));
    if (!WiFi.config(localIp, gateway, subnet)) {
      Serial.println("STA Failed to configure");
    }
  }
  if (jsonSetting["wifiMode"] == "sta") {
      WiFi.mode(WIFI_STA);
      WiFi.begin(jsonSetting["ssid"].as<const char*>(), jsonSetting["wifiPassword"].as<const char*>());
      if (testWifi()) {
        Serial.println("Succesfully Connected.");
        Serial.print("IP address: ");
        Serial.println(WiFi.localIP());
        //jsonModBusObject["ip"] = WiFi.localIP();
      } else {
        Serial.println("WiFi mode AP.");
        WiFi.mode(WIFI_AP);
        WiFi.softAP(jsonSetting["apName"].as<const char*>(), jsonSetting["apPassword"].as<const char*>());
        //jsonModBusObject["ip"] = WiFi.localIP();
      }
  } else if (jsonSetting["wifiMode"] == "ap") {
    WiFi.mode(WIFI_AP);
    WiFi.softAP(jsonSetting["apName"].as<const char*>(), jsonSetting["apPassword"].as<const char*>());
    //jsonModBusObject["ip"] = WiFi.localIP();
  }
  if (!MDNS.begin(jsonSetting["dnsName"])) {
    Serial.println("Error starting mDNS.");
  }

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });

  server.on("/token", HTTP_GET, [](AsyncWebServerRequest *request){
    token = request->header("Authorization");
    if (!isUserAuthorized(token) && !isAdminAuthorized(token)) {
      request->send(200, "text/plain", "Unauthorized");
    } else if (isAdminAuthorized(token)) {
      request->send(200, "text/plain", "Admin authorized");
    } else if (isUserAuthorized(token)) {
      request->send(200, "text/plain", "User authorized");
    }
  });
  
  server.on("/login", HTTP_GET, [](AsyncWebServerRequest *request){
    if (!isUserAuthorized(token) && !isAdminAuthorized(token)) {
      request->send(SPIFFS, "/login.html", "text/html");  
    } else {
      request->send(SPIFFS, "/index.html", "text/html");
    }
  });

  server.on("/admin", HTTP_GET, [](AsyncWebServerRequest *request){
    if (isAdminAuthorized(token)) {
      request->send(SPIFFS, "/admin.html", "text/html");
    } else {
      request->send(SPIFFS, "/index.html", "text/html");
   }
  });

  server.on("/user", HTTP_GET, [](AsyncWebServerRequest *request){
    if (isUserAuthorized(token)) {
      request->send(SPIFFS, "/user.html", "text/html");
    } else {
      request->send(SPIFFS, "/index.html", "text/html");
    }
  });

  server.on("/wifi", HTTP_GET, [](AsyncWebServerRequest *request){
    String json = "[";
    int n = WiFi.scanComplete();
    if (n == -2) {
      WiFi.scanNetworks(true);
    } else if (n) {
      for (int i = 0; i < n; ++i) {
        if (i) json += ",";
        json += "{";
        json += "\"ssid\":\"" + WiFi.SSID(i) + "\"";
        json += "}";
      }
      WiFi.scanDelete();
      if (WiFi.scanComplete() == -2) {
        WiFi.scanNetworks(true);
      }
    }
    json += "]";
    request->send(200, "application/json", json);
    json = String();
  });

  server.on("/loginPage", HTTP_GET, [](AsyncWebServerRequest *request) {
    String action = request->getParam("action")->value();
    if (action == "login") {
      token = generateToken();
      String login = request->getParam("login")->value(); 
      String password = request->getParam("password")->value();
      if (login == "admin" && password == "admin") {
        addAdminToken(token);
        AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "Admin authorized");
        response->addHeader("Authorization", token);
        request->send(response);
      } else if (login == "user" && password == "user") {
        addUserToken(token);
        AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "User authorized");
        response->addHeader("Authorization", token);
        request->send(response);
      }
    } else if (action == "logout") {
      token = request->header("Authorization");
      if (isAdminAuthorized(token)) {
        removeAdminToken(token);
        request->send(200, "text/plain", "Admin unauthorized");
      } else if (isUserAuthorized(token)) {
        removeUserToken(token);
        request->send(200, "text/plain", "User unauthorized");
      }
    }
  });

  AsyncCallbackJsonWebHandler* saveSetting = new AsyncCallbackJsonWebHandler("/saveSetting", [](AsyncWebServerRequest * request, JsonVariant & json) {
    auto&& jsonObj = json.as<JsonObject>();
    File file = SPIFFS.open("/setting.json", FILE_WRITE);
    serializeJson(json, file);
    file.close();
    json.clear();
    request->send(200, "application/json", "{\"save\": \"setting.json\"}");
  });
  server.addHandler(saveSetting);
  
  server.serveStatic("/css/bootstrap-icons.min.css", SPIFFS, "/css/bootstrap-icons.min.css"); 
  server.serveStatic("/css/style.css", SPIFFS, "/css/style.css");   
  server.serveStatic("/fonts/bootstrap-icons.woff2", SPIFFS, "/fonts/bootstrap-icons.woff2");   
  server.serveStatic("/js/jquery-3.7.1.min.js", SPIFFS, "/js/jquery-3.7.1.min.js");
    server.serveStatic("/js/highstock.js", SPIFFS, "/js/highstock.js");
  server.serveStatic("/js/script.js", SPIFFS, "/js/script.js");

  server.serveStatic("/setting.json", SPIFFS, "/setting.json"); 
  
  server.begin();                                                                                                         
  Serial.println("Server begin.");                                                                                        
}                                                                                                                         

void loop() {                                                                                                             

}                                                                                                                       

String generateToken() {
  token = "";
  for (int i = 0; i < 16; i++) {
    char randomChar = random(33, 127);
    token += randomChar;
  }
  return token;
}

bool isAdminAuthorized(String token) {
  if (token.length() == 0) {
    return false;
  }
  for (int i = 0; i < 5; i++) {
    if (adminClient[i] == token) {
      Serial.println("isAdminAuthorized");
      return true;
    }
  }
  return false;
}

bool isUserAuthorized(String token) {
  if (token.length() == 0) {
    return false;
  }
  for (int i = 0; i < 5; i++) {
    if (userClient[i] == token) {
      Serial.println("isUserAuthorized");
      return true;
    }
  }
  return false;
}

void addAdminToken(String token) {
  adminClient[adminTokenIndex] = token;
  adminTokenIndex = (adminTokenIndex + 1) % 5;
}

void addUserToken(String token) {
  userClient[userTokenIndex] = token;
  userTokenIndex = (userTokenIndex + 1) % 5;
}

void removeAdminToken(String token) {
  for (int i = 0; i < 5; i++) {
    if (adminClient[i] == token) {
      adminClient[i] = "";
      break;
    }
  }
}

void removeUserToken(String token) {
  for (int i = 0; i < 5; i++) {
    if (userClient[i] == token) {
      userClient[i] = "";
      break;
    }
  }
}

bool readFile(fs::FS &fs, const char * path, DynamicJsonDocument& jsonDoc) {
  Serial.printf("Reading file: %s\n", path);
  File file = fs.open(path);
  if (!file) {
    Serial.println("File not found.");
    return false;
  }
  DeserializationError error = deserializeJson(jsonDoc, file);
  if (error) {
    Serial.println("Deserialization error.");
    return false;
  }
  file.close();
  return true;
}

bool testWifi(void) {
  int c = 0;
  Serial.println("Waiting for Wifi to connect.");
  while ( c < 20 ) {
    if (WiFi.status() == WL_CONNECTED) {
      return true;
    }
    delay(500);
    Serial.print(".");
    c++;
  }
  Serial.println("");
  Serial.println("Connect timed out, opening AP.");
  return false;
}
