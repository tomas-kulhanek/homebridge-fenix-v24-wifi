import {ThermostatMode} from '../Enum/ThermostatMode';
import ThermostatResponse from './ThermostatResponse';

export default class ThermostatData {

  constructor(
    private data: ThermostatResponse,
  ) {
  }

  get targetHeatingCoolingState() {
    if (this.mode === ThermostatMode.OFF) {
      return 0;
    }
    if (this.mode === ThermostatMode.ANTIFREEZE) {
      return 2;
    }
    if (this.mode === ThermostatMode.AUTO) {
      return 3;
    }

    return 1;
  }

  get currentHeatingCoolingState(): number {
    if (this.mode === ThermostatMode.OFF || this.data.heating_up !== '1') {
      return 0;
    }
    return 1;
  }

  get mode(): ThermostatMode {
    if (this.data.gv_mode === ThermostatMode.OFF) {
      return ThermostatMode.OFF;
    }
    if (this.data.gv_mode === ThermostatMode.AUTO) {
      return ThermostatMode.AUTO;
    }
    if (this.data.gv_mode === ThermostatMode.ANTIFREEZE) {
      return ThermostatMode.ANTIFREEZE;
    }
    return ThermostatMode.MANUAL;
  }

  set mode(mode: ThermostatMode) {
    this.data.gv_mode = mode.valueOf();
  }

  get actualTemperature(): number {
    return parseInt(this.data.temperature_air) / 10;
  }

  get requiredTemperature(): number {
    if (this.mode === ThermostatMode.OFF) {
      return 41;
    }
    if (this.mode === ThermostatMode.AUTO) {
      return parseInt(this.data.consigne_confort) / 10;
    }
    if (this.mode === ThermostatMode.ANTIFREEZE) {
      return parseInt(this.data.consigne_hg) / 10;
    }
    return parseInt(this.data.consigne_manuel) / 10;
  }

  set requiredTemperature(temperature: number) {
    this.data.consigne_manuel = '' + (temperature * 10);
  }

  get realRequiredTemperature(): number {
    return parseInt(this.data.consigne_manuel);
  }

  get model(): string {
    return 'KP';
  }

  get softwareVersion(): string {
    return 'MMM';
  }
}