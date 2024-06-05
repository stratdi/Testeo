import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Question } from 'src/app/models/question.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';
import { QuestionFormComponent } from 'src/app/shared/components/question-form/question-form.component';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.page.html',
  styleUrls: ['./question-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, QuestionFormComponent, IonBackButton, IonButtons]
})
export class QuestionEditPage implements OnInit {

  question!: Question;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadQuestion();
  }

  loadQuestion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const questionId = this.route.snapshot.paramMap.get('questionId');

    if (id && questionId) {
      this.testService.getQuestionById(+id, +questionId).subscribe(
        question => this.question = question,
        (error) => {
          if (error.status === 404) {
            const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
            this.router.navigateByUrl(`/tests/${baseUrl}`, { replaceUrl: true });
          } else {
            console.error(error);
            this.toastService.create("No s'ha pogut carregar les dades de la pregunta...", "bottom", false);
          }
        }
      );
    } else {
      console.error("Id o questionId sense valor");
      this.toastService.create("No s'ha pogut carregar les dades de la pregunta...", "bottom", false);
    }
  }

}
