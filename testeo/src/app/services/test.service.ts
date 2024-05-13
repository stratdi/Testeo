import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.interface'
import { AuthenticationService } from './authentication.service';
import { AppConstants } from '../app.constants';
import { TestForm } from '../models/test-form.interface';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(AppConstants.TESTS_URL, this.authService.getAuthHeader());
  }

  getFavoriteTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${AppConstants.TESTS_URL}/favorites`, this.authService.getAuthHeader());
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${AppConstants.TESTS_URL}/${id}?loadAnswers=true`, this.authService.getAuthHeader());
  }

  setFavorite(id: number, favorite: boolean): Observable<Test> {
    const body = { favorite };
    return this.http.put<Test>(`${AppConstants.TESTS_URL}/${id}/favorite`, body, this.authService.getAuthHeader());
  }

  saveTest(test: TestForm, testId?: number): Observable<any> {
    console.log("TEEST", test);
    if (testId) {
      return this.http.put<TestForm>(`${AppConstants.TESTS_URL}/${testId}`, test, this.authService.getAuthHeader());
    } else {
      return this.http.post<TestForm>(`${AppConstants.TESTS_URL}`, test, this.authService.getAuthHeader());
    }
  }


}