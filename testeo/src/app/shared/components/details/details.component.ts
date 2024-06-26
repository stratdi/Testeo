import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButtons, IonBackButton, IonLabel, IonItem, IonList, IonSkeletonText, IonButton, IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonNote, IonAlert]
})
export class DetailsComponent {
  @Input() test?: Test;
  @Input() favoriteMode: boolean = false;

  constructor(
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  public deleteButtons = [
    {
      text: 'Cancel·la',
      role: 'cancel'
    },
    {
      text: 'Accepta',
      role: 'confirm',
      handler: () => {
        if (this.test) {
          this.testService.deleteTest(this.test.id).subscribe(() => {
            const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
            this.router.navigateByUrl(`/tests/${baseUrl}`, { replaceUrl: true });
            this.toastService.create("Test eliminat satisfactòriament.", "bottom", true);
          }, error => {
            console.error(error);
            this.toastService.create("Error eliminant el test...", "bottom", true);
          });
        }
      },
    },
  ];

  public deleteQuestionButtons = [
    {
      text: 'Cancel·la',
      role: 'cancel'
    },
    {
      text: 'Accepta',
      role: 'confirm'
    },
  ];

  public editQuestion(questionId: number) {
    const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
    this.router.navigate([`/tests/${baseUrl}/${this.test?.id}/questions/${questionId}/edit`]);
  }

  public addQuestion() {
    const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
    this.router.navigate([`/tests/${baseUrl}/${this.test?.id}/questions`]);
  }

  public edit() {
    const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
    this.router.navigate([`/tests/${baseUrl}/${this.test?.id}/edit`]);
  }

  public take() {
    const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
    this.router.navigate([`/tests/${baseUrl}/${this.test?.id}/take`]);
  }

  deleteQuestion(ev: any, testId: number, questionId: number) {
    if (ev.detail.role === 'confirm') {
      this.testService.deleteQuestion(testId, questionId).subscribe(() => {
        this.loadTest();
        this.toastService.create("Pregunta eliminada satisfactòriament.", "bottom", true);
      }, error => {
        console.error(error);
        this.toastService.create("Error eliminant la pregunta...", "bottom", false);
      });
    }
  }
  loadTest(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.testService.getTestById(+id).subscribe(
        test => { this.test = test },
        error => {
          console.error(error);
          this.toastService.create("No s'ha pogut obtenir les dades del test...", "bottom", false);
        });
    }
  }

}
