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

- Example `config.json` with one vacuum and room cleaning:

```
   "platforms": [
        {
            "accessToken": "JWT TOKEN from Fenix servers",
            "refreshToken": "Refresh token from Fenix servers",
            "temperatureCheckInterval": 30,
            "platform": "FenixV24Wifi"
        }
    ],
```

Or you can use Homebridge UI

## Fenix Tokens
You must use some proxy like [Proxyman](https://proxyman.io/) on your mobile and catch traffic on host `https://vs2-fe-identity-prod.azurewebsites.net/`.
- Set Proxyman to catch all traffic
- Enable SSL Proxying for domain `https://vs2-fe-identity-prod.azurewebsites.net/`
- Open [FENIX V24 Wifi](https://apps.apple.com/gb/app/fenix-v24-wifi/id1474206689) application on your mobile
- Log in using your credentials
- Open Proxyman and check POST request on `https://vs2-fe-identity-prod.azurewebsites.net/connect/token`
- Response on this request contain `access_token` and `refresh_token`

The token is only valid for 24 hours. The plugin automatically renews the token so that it is not invalidated. The renewed token, including the refresh token, is then stored in the `.fenixv24Wifi.config.json` file, which is stored in the Homebridge storage path. If Homebridge has not been started for a long time, this token needs to be manually updated again using the above steps. 