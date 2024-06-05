import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';
import { IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton, IonCheckbox, IonListHeader, IonBackButton, IonButtons, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-take-form',
  templateUrl: './take-form.component.html',
  styleUrls: ['./take-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton, IonCheckbox, IonButtons, IonListHeader, IonBackButton, IonNote]
})
export class TakeFormComponent implements OnInit {

  @Input() test!: Test;
  testId?: number;

  takeForm: FormGroup;
  evaluated: boolean = false;
  correctAnswers: number = 0;
  failedAnswers: number = 0;
  emptyAnswers: number = 0;
  mark: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private testService: TestService,
    private toastService: ToastService
  ) {
    this.takeForm = this.formBuilder.group({
      questions: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    if (this.test != null) {
      this.prepareForm();
    }
  }

  private prepareForm() {
    this.testId = this.test.id;
    this.test.questions.forEach((q, i) => {
      const question = this.formBuilder.group({
        id: [q.id, [Validators.required]],
        answerId: []
      });

      this.questions.push(question);
    });
  }

  get questions() {
    return this.takeForm.get('questions') as FormArray;
  }

  public simpleMark(event: any, questionIndex: number, answerId: number) {
    let question = this.questions.at(questionIndex);
    question.get('answerId')?.setValue(answerId);
  }

  async onSubmit() {
    this.testService.evaluateTest(this.test.id).subscribe(
      (response) => {
        this.evaluate();
      },
      (error) => {
        console.error(error);
        this.toastService.create("No s'ha pogut avaluar el test...", "bottom", false);
      }
    );
  }


  isAnswerFailed(questionIndex: number): boolean {
    const selectedAnswerId = this.questions.at(questionIndex).get('answerId')?.value;
    const question = this.test.questions[questionIndex];
    return !question.answers.some(answer => answer.correct && answer.id === selectedAnswerId);
  }

  isAnswerCheckedFailed(questionIndex: number, answerId: number): boolean {
    const selectedAnswerId = this.questions.at(questionIndex).get('answerId')?.value;
    const question = this.test.questions[questionIndex];
    return !question.answers.find(answer => answer.correct && answer.id === selectedAnswerId) && selectedAnswerId === answerId;
  }

  private evaluate() {
    this.evaluated = true;
    this.correctAnswers = 0;
    this.failedAnswers = 0;
    this.emptyAnswers = 0;
    this.mark = 0;

    this.test.questions.forEach((question, index) => {
      if (this.isAnswerEmpty(index)) {
        this.emptyAnswers++;
      } else if (this.isAnswerFailed(index)) {
        this.failedAnswers++;
      } else {
        this.correctAnswers++;
      }
    });

    this.calculateMark();
  }

  private calculateMark() {
    if (this.test.successScore) {
      this.mark = this.correctAnswers * this.test.successScore;
    }

    if (this.test.errorScore) {
      this.mark += this.failedAnswers * this.test.errorScore;
    }
  }

  hasEvaluationScore() {
    return this.test.successScore || this.test.errorScore;
  }

  private isAnswerEmpty(questionIndex: number) {
    return this.questions.at(questionIndex).get('answerId')?.value === null;
  }

}
