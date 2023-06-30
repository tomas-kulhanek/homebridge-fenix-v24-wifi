import axios, {Axios} from 'axios';
import TokenManager from '../TokenManager';

export default class FenixApi {

  private axiosClient: Axios;

  constructor(
    private readonly tokenManager: TokenManager,
  ) {
    this.axiosClient = axios.create({
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  private readonly ApiUrl = 'https://v24.fenixgroup.eu';

  readMyInformation() {
    return this.axiosClient.post(this.ApiUrl + '/api/v0.1/human/smarthome/read/');
  }
}
