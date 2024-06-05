import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { TakeFormComponent } from 'src/app/shared/components/take-form/take-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-test-take',
  templateUrl: './test-take.page.html',
  styleUrls: ['./test-take.page.scss'],
  standalone: true,
  imports: [TakeFormComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class TestTakePage implements OnInit {

  test!: Test;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadTest();
  }

  //FIXME: prova
  loadTest(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.testService.getTestById(+id).subscribe(
        test => {
          this.test = test;
          if (!this.test.questions || this.test.questions.length === 0) {
            const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
            this.router.navigateByUrl(`/tests/${baseUrl}`, { replaceUrl: true });
          }
        },
        error => {
          if (error.status === 404) {
            const baseUrl = this.route.snapshot.url.slice(0, 1).map(segment => segment.path).join('/');
            this.router.navigateByUrl(`/tests/${baseUrl}`, { replaceUrl: true });
          } else {
            this.toastService.create("No s'ha pogut carregar el les dades del test...", "bottom", false);
          }
        });
    }
  }
}
