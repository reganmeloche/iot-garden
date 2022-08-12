# IoT Garden

<img src="/pics/pic1.jpg" width="400">

<img src="/pics/pic2.jpg" width="400">

## About

This is a full-stack IoT project that allows you to control your garden over the internet! It consists of a NodeMCU chip connected to a moisture sensor and a water pump. The moisture sensor is inserted into the soil of your garden, and a moisture reading is periodically taken. This data is logged to a database, which can be viewed on a dashboard. The user can activate the pump from the dashboard, so that the plants get watered. 

The dashboard is a React web app generated from create-react-app, running node.js in the back-end. The database is MongoDB, hosted on atlas, and the communication between the NodeMCU chip and the dashboard server is accomplished with CloudMQTT, a hosted MQTT server.

The code that gets run on the NodeMCU is found in the nodeMCU folder. There are several libraries required to run the code, which can be found at the top of the .ino file.

<img src="/pics/dashboard.png" width="400">

## Technologies

### Hardware
- <a href="https://www.amazon.ca/gp/product/B06VV39XD8/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1" target="_blank">NodeMCU Chip</a>
- <a href="https://elmwoodelectronics.ca/products/adafruit-stemma-soil-sensor-i2c-capacitive-moisture-sensor" target="_blank">Capacative Moisture Sensor</a>
- <a href="https://elmwoodelectronics.ca/products/peristaltic-liquid-pump-with-silicone-tubing-5v-to-6v-dc-power" target="_blank">5-6v Peristaltic Pump</a>
- <a href="https://www.amazon.ca/gp/product/B07589R1Q3/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1" target="_blank">Breadboard</a>
- Other standard circuit components
  - 2N2222 NPN Transistor
  - Diode
  - 560 Ohm Resistor
  - Jumper wires
  - 6V power source (batteries, wall wart, etc...)

The total cost of all the hardware is about $70 CAD.
  
### Software
- Heroku: For running the dashboard in the cloud
- CloudMQTT: For hosting the MQTT server in the cloud
- Arduino IDE: for programming the NodeMCU
- create-react-app: For setting up the React front-end project
- React/Redux: For front-end project and state management
- Node.js (and Express): For the backend of the dashboard
- Pond.js and react-time-series charts for displaying the data on the dashboard
- MongoDB: For the database that stores the display messages
- Atlas: Hosting for MongoDB
- Passport: For login and session management
- Other useful npm packages: react-bootstrap, mqtt, moment, axios

All of the software used in this project is free, provided you stay on the free tiers for CloudMQTT, Heroku, and atlas.

## Circuit Diagram

<img src="/pics/diagram.jpg" width="400">

<img src="/pics/top_view.jpg" width="400">

## Future Development
- Design and 3D print some components, such as an enclosure and/or a water spout
- Investigate using sleep modes on the NodeMCU for more efficient power management
- Make the dashboard chart more user-friendly
