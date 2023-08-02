import axios, {Axios} from 'axios';
import TokenManager from '../TokenManager';
import {Md5} from "ts-md5";

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

  readMyInformation(smarthomeId: string) {
    const searchParams = new URLSearchParams();
    searchParams.append('token', this.tokenManager.accessToken);
    searchParams.append('smarthome_id', smarthomeId);
    searchParams.append('lang', 'cz_CZ');
    return this.axiosClient.post(this.ApiUrl + '/api/v0.1/human/smarthome/read/', searchParams);
  }
}
