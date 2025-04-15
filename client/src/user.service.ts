import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from './environments/environment';

const apiBase = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  async inspectUser(username = 'andrew') {
    const url = `${apiBase}/user/${username}`;
    const data = await firstValueFrom(this.http.get(url));
    console.log(data);
    return data;
  }

  async duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    const url = `${apiBase}/users?username=${user1}&username=${user2}`;
    const data = await firstValueFrom(this.http.get(url));
    console.log(data);
    return data;
  }
}
