import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, ReplaySubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { AppConstants } from '../app.constants';
import { User } from '../models/user.interface';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email: any; password: any }): Observable<any> {
    return this.http.post(`${AppConstants.SIGNIN_URL}`, credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        console.log("PONGO EL TOKEN", this.token);
        return from(Preferences.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.loadToken();
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Preferences.remove({ key: TOKEN_KEY });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${AppConstants.USER_URL}`, this.getAuthHeader());
  }

  getAuthHeaderToken(): string {
    return "Bearer " + this.token;
  }

  getAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': this.getAuthHeaderToken()
    });

    console.log("HEADER", headers);

    const options = {
      headers: headers
    };

    return options;
  }
}