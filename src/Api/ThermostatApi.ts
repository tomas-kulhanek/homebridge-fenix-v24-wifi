import axios, {Axios} from 'axios';
import TokenManager from '../TokenManager';
import {ThermostatMode} from '../Enum/ThermostatMode';
import ThermostatData from '../DTO/ThermostatData';
import FenixApi from './FenixApi';

export default class ThermostatApi {

  private axiosClient: Axios;

  constructor(
    private readonly uuid: string,
    private readonly tokenManager: TokenManager,
    private readonly smartHomeId: string,
    private readonly fenixApi:FenixApi,
  ) {
    this.axiosClient = axios.create({
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  private readonly ThermostatApiUrl = 'https://vs2-fe-apim-prod.azure-api.net';

  getInformation():Promise<ThermostatData> {
    return new Promise((resolve, reject) => {
      this.fenixApi.readMyInformation(this.smartHomeId).then((data) => {
        const zones = data.data.data.zones;
        for (const zone in data.data.data.zones) {
          const fdevices = zones[zone].devices;
          for (const device in fdevices) {
            if (fdevices[device].id_device === this.uuid) {
              resolve(new ThermostatData(fdevices[device]));
              return;
            }
          }
        }
      }).catch(reject);
    });
  }

  async setTemperature(thermostat: ThermostatData) {
    const searchParams = new URLSearchParams();
    searchParams.append('token', this.tokenManager.accessToken);
    searchParams.append('smarthome_id', this.smartHomeId);
    searchParams.append('context', '1');
    searchParams.append('query[id_device]', this.uuid);
    if (thermostat.mode === ThermostatMode.OFF || thermostat.mode === ThermostatMode.AUTO) {
      searchParams.append('query[gv_mode]', thermostat.mode.valueOf());
      searchParams.append('query[nv_mode]', thermostat.mode.valueOf());
    } else if (thermostat.mode === ThermostatMode.ANTIFREEZE) {
      searchParams.append('query[gv_mode]', thermostat.mode.valueOf());
      searchParams.append('query[nv_mode]', thermostat.mode.valueOf());
      searchParams.append('query[consigne_hg]', '' + thermostat.realRequiredTemperature);
    } else {
      searchParams.append('query[gv_mode]', '15');
      searchParams.append('query[nv_mode]', '15');
      searchParams.append('query[consigne_manuel]', '' + thermostat.realRequiredTemperature);
    }

    return await this.axiosClient.post('https://v24.fenixgroup.eu/api/v0.1/human/query/push/', searchParams);
  }
}
