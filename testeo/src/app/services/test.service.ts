import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.interface'
import { AuthenticationService } from './authentication.service';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://192.168.1.68:8080/api/v1/tests';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl, this.authService.getAuthHeader());
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${id}?loadAnswers=true`, this.authService.getAuthHeader());
  }

  setFavorite(id: number, favorite: boolean): Observable<Test> {
    const body = { favorite };
    return this.http.put<Test>(`${this.apiUrl}/${id}/favorite`, body, this.authService.getAuthHeader());
  }
}