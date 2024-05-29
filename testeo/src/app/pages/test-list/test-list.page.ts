import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { Test } from '../../models/test.interface';
import { TestService } from '../../services/test.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'test-list',
  templateUrl: 'test-list.page.html',
  styleUrls: ['test-list.page.scss'],
  standalone: true,
  imports: [ListComponent, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TestListPage {
  tests?: Test[];
  loading: boolean = true;

  constructor(
    private testService: TestService,
    private toastService: ToastService
  ) { }

  ionViewWillEnter() {
    this.fetchTests();
  }

  fetchTests() {
    this.testService.getTests().subscribe(
      (data) => {
        this.tests = data;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.toastService.create("No s'ha pogut obtenir els llistat de tests...", "bottom", false);
        this.loading = false;
      }
    );
  }

}
