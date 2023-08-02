import {API, Logger} from 'homebridge';
import axios, {Axios} from 'axios';
import {Md5} from 'ts-md5';

export default class TokenManager {
  private readonly ttl = 60 * 60; // one hour
  private expireAt: number|undefined;

  private axiosClient: Axios;
  private token: string|undefined;

  constructor(
    private email: string,
    private password: string,
    private readonly logger: Logger,
    private readonly hbApi: API,
  ) {
    this.axiosClient = axios.create();
  }

  get userEmail(): string {
    return this.email;
  }

  async loadInitialTokens() {
    this.logger.debug('Check tokens from custom config');
    await this.refreshTokens();
    this.logger.debug('Check tokens complete');
    setInterval(() => {
      if (this.isTokenNearToExpireExpired()) {
        this.refreshTokens();
      }
    }, 15 * 60000);
  }

  isTokenNearToExpireExpired() {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (this.ttl * 1000));
    const currentTime = currentDate.getTime() / 1000;
    return currentTime > (this.expireAt ?? 0);
  }

  async refreshTokens() {
    if (!this.isTokenNearToExpireExpired()) {
      this.logger.debug('Token is not expired.');
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.append('email', this.email);
    searchParams.append('password', Md5.hashStr(this.password));
    searchParams.append('remember_me', 'true');

    const response = await this.axiosClient.post('https://v24.fenixgroup.eu/api/v0.1/human/user/auth/', searchParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.token = response.data.data.token;
    this.expireAt = Date.parse(response.data.data.user_infos.token_expire) / 1000;
    this.logger.info('Tokens are refreshed - '+this.token);
  }

  public get accessToken(): string {
    return this.token ?? '';
  }
}