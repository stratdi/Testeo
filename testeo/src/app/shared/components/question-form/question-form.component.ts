import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonTextarea } from '@ionic/angular/standalone';
import { QuestionForm } from 'src/app/models/question-form.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton, IonRadio, IonRadioGroup, IonIcon]
})
export class QuestionFormComponent implements OnInit {

  @Input() question: QuestionForm;
  questionForm: FormGroup;

  testId!: number;
  questionId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {

    this.question = {
      statement: '',
      feedback: '',
      answers: [],
      correctAnswer: -1
    };

    const testIdString = this.route.snapshot.paramMap.get('id');
    if (testIdString) {
      this.testId = parseInt(testIdString);
    }

    const questionIdString = this.route.snapshot.paramMap.get('questionId');
    if (questionIdString) {
      this.questionId = parseInt(questionIdString);
    }

    this.questionForm = this.formBuilder.group({
      statement: [this.question ? this.question.statement : '', [Validators.required, Validators.maxLength(1000)]],
      feedback: [this.question ? this.question.feedback : '', [Validators.required, Validators.maxLength(1000)]],
      answers: this.formBuilder.array([]),
      correctAnswer: [null, [Validators.required]]
    });
  }


  ngOnInit(): void {
    if (this.testId && this.questionId) {
      this.prepareUpdate();
    } else {
      this.addAnswer();
      this.addAnswer();
    }
  }

  private async prepareUpdate() {
    if (this.testId && this.questionId) {
      this.testService.getQuestionById(this.testId, this.questionId).subscribe(
        (question) => {
          this.questionForm.patchValue(question);

          let correct = null;
          question.answers.forEach((a, i) => {
            const answer = this.formBuilder.group({
              text: [a.text, [Validators.required]],
              correct: [a.correct]
            });

            if (a.correct) {
              correct = i;
            }
            this.answers.push(answer);
            console.log("IS CORR", a.correct, i);
          });

          if (correct) {
            console.log("patch", correct);
            this.questionForm.patchValue({ correctAnswer: correct });
            console.log("valueeee", this.questionForm.controls['correctAnswer']?.value);

          }

        },
        (error) => {
          console.error("Error carregant les dades:", error);
          this.toastService.create("Error carregant les dades...", "bottom", false);
        }
      );
    }
  }

  addAnswer() {
    const answer = this.formBuilder.group({
      text: ['', [Validators.required]],
      correct: [false]
    });
    this.answers.push(answer);
  }

  deleteAnswer(i: number) {
    if (i < this.correctAnswer) {
      this.questionForm.patchValue({ correctAnswer: this.correctAnswer - 1 });
    } else if (i == this.correctAnswer) {
      this.questionForm.patchValue({ correctAnswer: null });
    }

    this.answers.removeAt(i);
  }

  canDelete(): boolean {
    return this.answers.length > 2;
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  get correctAnswer() {
    return this.questionForm.get('correctAnswer')?.value;
  }

  async onSubmit(action: string) {
    console.log(this.questionForm)
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      await this.toastService.create("El formulari té errors.", "bottom", false);
      return;
    }

    this.answers.controls.forEach((control, index) => {
      control.patchValue({
        correct: index === this.questionForm.value.correctAnswer
      });
    });

    this.question = this.questionForm.value;

    this.testService.saveQuestion(this.question, this.testId, this.questionId).subscribe(
      (response) => {
        // Edició
        console.log("EDICIO O CREACIO:", this.questionId, this.questionId != null);
        if (this.questionId) {
          this.location.back();
        } //Creació
        else {
          if (action === "end") {
            this.location.back();
          } else if (action === "addQuestion") {
            this.questionForm.reset();
            // console.log("SSS", this.route.snapshot.url);
            const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
            this.router.navigateByUrl(`tests/${baseUrl}/${this.testId}/questions`, { replaceUrl: true });
          }
        }

        this.toastService.create("Pregunta desada satisfactòriament.", "bottom", true);

      },
      (error) => {
        console.error("Error desant la pregunta:", error);
        this.toastService.create("Error desant la pregunta...", "bottom", false);
      }
    );
  }
}