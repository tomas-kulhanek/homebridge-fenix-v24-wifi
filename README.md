[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)
[![GitHub last commit](https://img.shields.io/github/last-commit/tomas-kulhanek/homebridge-fenix-v24-wifi.svg)](https://github.com/tomas-kulhanek/homebridge-fenix-v24-wifi)
[![npm](https://img.shields.io/npm/dt/homebridge-fenix-v24-wifi.svg)](https://www.npmjs.com/package/homebridge-fenix-v24-wifi)
[![npm version](https://badge.fury.io/js/homebridge-fenix-v24-wifi.svg)](https://badge.fury.io/js/homebridge-fenix-v24-wifi)

<p align="center">

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">
<img src="https://www.fenixgroup.cz/sites/default/files/fenix_2020_2.png"  width="300">

</p>

# homebridge-fenix-v24-wifi

## Homebridge Platform Plugin Fenix V24 WiFi


This [homebridge](https://github.com/homebridge/homebridge) plugin allows you to control the Fenix V24 WiFi thermostats in your Apple Home App (HomeKit).

## Features
- Setting the target temperature for each thermostat
- Monitor the current temperature
- Turn the thermostat off and on


## Instructions

1. Install the plugin as `root` (`sudo su -`) with `npm install -g homebridge-fenix-v24-wifi@latest --unsafe-perm`.
2. Customize you homebridge configuration `config.json`.
3. Restart homebridge, ggf. `service homebridge restart`.

- Example `config.json`

```
   "platforms": [
        {
            "email": "-----",
            "password": "------",
            "temperatureCheckInterval": 30,
            "temperatureUnit": 0,
            "smarthomeId": 009,
            "platform": "FenixV24Wifi"
        }
    ],
```

Or you can use Homebridge UI

## Fenix SmartHomeId
Open Fenix V24 Dashboard in your [browser](https://v24.fenixgroup.eu/mobile/dist) and sign in. Click on your home and check URL where is your smarthomeid  