import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionFormPage } from './question-form.page';

describe('QuestionFormPage', () => {
  let component: QuestionFormPage;
  let fixture: ComponentFixture<QuestionFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
