import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonTextarea, IonCheckbox } from '@ionic/angular/standalone';
import { QuestionForm } from 'src/app/models/question-form.interface';
import { Question } from 'src/app/models/question.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';
import { atLeastOneCorrectValidator } from 'src/app/validators/answer.validator';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton, IonRadio, IonRadioGroup, IonIcon, IonCheckbox]
})
export class QuestionFormComponent implements OnInit {

  @Input() questionModel!: Question;
  // @Input() question: QuestionForm;
  question: QuestionForm;
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
      answers: []
    };

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.testId = +id;
    }

    // const questionIdString = this.route.snapshot.paramMap.get('questionId');
    // if (questionIdString) {
    //   this.questionId = parseInt(questionIdString);
    // }

    this.questionForm = this.formBuilder.group({
      statement: [this.question ? this.question.statement : '', [Validators.required, Validators.maxLength(1000)]],
      feedback: [this.question ? this.question.feedback : '', [Validators.required, Validators.maxLength(1000)]],
      answers: this.formBuilder.array([], { validators: atLeastOneCorrectValidator() })
    });
  }


  ngOnInit(): void {
    // if (this.testId && this.questionId) {
    //   this.prepareUpdate();
    // } else {
    //   this.addAnswer();
    //   this.addAnswer();
    // }
    if (this.questionModel != null) {
      this.prepareUpdate();
    } else {
      this.addAnswer();
      this.addAnswer();
    }
  }

  private async prepareUpdate() {
    this.questionForm.patchValue(this.questionModel);
    this.questionId = this.questionModel.id;

    let correct = null;
    this.questionModel.answers.forEach((a, i) => {
      const answer = this.formBuilder.group({
        text: [a.text, [Validators.required]],
        correct: [a.correct]
      });

      if (a.correct) {
        correct = i;
      }

      this.answers.push(answer);
    });

    if (correct) {
      this.questionForm.patchValue({ correctAnswer: correct });
    }
  }

  // private async prepareUpdate() {
  //   if (this.testId && this.questionId) {
  //     this.testService.getQuestionById(this.testId, this.questionId).subscribe(
  //       (question) => {
  //         this.questionForm.patchValue(question);

  //         let correct = null;
  //         question.answers.forEach((a, i) => {
  //           const answer = this.formBuilder.group({
  //             text: [a.text, [Validators.required]],
  //             correct: [a.correct]
  //           });

  //           if (a.correct) {
  //             correct = i;
  //           }
  //           this.answers.push(answer);
  //         });

  //         if (correct) {
  //           this.questionForm.patchValue({ correctAnswer: correct });
  //         }

  //       },
  //       (error) => {
  //         console.error(error);
  //         this.toastService.create("No s'ha pogut carregar les dades de la pregunta...", "bottom", false);
  //       }
  //     );
  //   }
  // }

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
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      if (this.noAnswerSelected()) {
        await this.toastService.create("Heu de marcar una resposta correcta.", "bottom", false);
      } else {
        await this.toastService.create("El formulari té errors.", "bottom", false);
      }

      return;
    }

    this.question = this.questionForm.value;

    this.testService.saveQuestion(this.question, this.testId, this.questionId).subscribe(
      (response) => {
        if (action === "end") {
          this.location.back();
        } else if (action === "addQuestion") {
          this.questionForm.reset();
          const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
          this.router.navigateByUrl(`tests/${baseUrl}/${this.testId}/questions`, { replaceUrl: true });
        }

        this.toastService.create("Pregunta desada satisfactòriament.", "bottom", true);
      },
      (error) => {
        console.error(error);
        this.toastService.create("No s'ha pogut desar la pregunta...", "bottom", false);
      }
    );
  }

  simpleCheck(event: any, index: number) {
    this.answers.controls.forEach((control, i) => {
      control.patchValue({
        correct: i === index
      });
    });
  }

  noAnswerSelected(): boolean {
    return this.answers.errors?.['atLeastOneCorrect'] ?? false;
  }
}