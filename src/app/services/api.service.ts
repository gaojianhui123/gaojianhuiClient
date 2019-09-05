import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/index';
import { _HttpClient } from '@delon/theme';
import { User } from '../model/User';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';


@Injectable()
export class ApiService {
  constructor(private  httpClient: _HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
  }

  public get(path: string, httpParams?: HttpParams): Observable<any> {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    return this.httpClient.get(`${path}`, { params: httpParams });
  }

  public post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    return this.httpClient.post(
      `${path}`, body,{},options
    );
  }

  public getCurrentUser(): User {
    return this.tokenService.get().currentUser;
  }
}
