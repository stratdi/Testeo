import { Component } from '@angular/core';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'test-favorites',
  templateUrl: 'test-favorites.page.html',
  styleUrls: ['test-favorites.page.scss'],
  standalone: true,
  imports: [ListComponent, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TestFavoritesPage {
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
    this.testService.getFavoriteTests().subscribe(
      (data) => {
        this.tests = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.toastService.create("No s'ha pogut obtenir els favorits...", "bottom", false);
        this.loading = false;
      }
    );
  }
}
