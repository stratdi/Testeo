import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.interface'
import { AuthenticationService } from './authentication.service';
import { AppConstants } from '../app.constants';
import { TestForm } from '../models/test-form.interface';
import { Question } from '../models/question.interface';
import { QuestionForm } from '../models/question-form.interface';
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

  evaluateTest(id: number): Observable<void> {
    return this.http.put<void>(`${AppConstants.TESTS_URL}/${id}/evaluate`, null, this.authService.getAuthHeader());
  }

  getQuestionById(id: number, questionId: number) {
    return this.http.get<Question>(`${AppConstants.TESTS_URL}/${id}/questions/${questionId}`, this.authService.getAuthHeader());
  }

  setFavorite(id: number, favorite: boolean): Observable<Test> {
    const body = { favorite };
    return this.http.put<Test>(`${AppConstants.TESTS_URL}/${id}/favorite`, body, this.authService.getAuthHeader());
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${AppConstants.TESTS_URL}/${id}`, this.authService.getAuthHeader());
  }

  deleteQuestion(id: number, questionId: number): Observable<void> {
    return this.http.delete<void>(`${AppConstants.TESTS_URL}/${id}/questions/${questionId}`, this.authService.getAuthHeader());
  }

  saveTest(test: TestForm, testId?: number): Observable<any> {
    if (testId) {
      return this.http.put<TestForm>(`${AppConstants.TESTS_URL}/${testId}`, test, this.authService.getAuthHeader());
    } else {
      return this.http.post<TestForm>(`${AppConstants.TESTS_URL}`, test, this.authService.getAuthHeader());
    }
  }

  saveQuestion(question: QuestionForm, testId: number, questionId?: number): Observable<any> {
    if (questionId) {
      return this.http.put<TestForm>(`${AppConstants.TESTS_URL}/${testId}/questions/${questionId}`, question, this.authService.getAuthHeader());
    } else {
      return this.http.post<TestForm>(`${AppConstants.TESTS_URL}/${testId}/questions`, question, this.authService.getAuthHeader());
    }
  }


}