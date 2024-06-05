import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';
import { TestFormComponent } from 'src/app/shared/components/test-form/test-form.component';

@Component({
  selector: 'test-edit-page',
  templateUrl: './test-edit.page.html',
  styleUrls: ['./test-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TestFormComponent, IonButtons, IonBackButton]
})
export class TestEditPage implements OnInit {

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
        test => this.test = test,
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
