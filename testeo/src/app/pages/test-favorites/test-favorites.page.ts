import { Component } from '@angular/core';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'test-favorites',
  templateUrl: 'test-favorites.page.html',
  styleUrls: ['test-favorites.page.scss'],
  standalone: true,
  imports: [ListComponent, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TestFavoritesPage {
  tests?: Test[];

  constructor(private testService: TestService) { }

  ionViewWillEnter() {
    this.fetchTests();
  }

  fetchTests() {
    this.testService.getFavoriteTests().subscribe(
      (data) => {
        this.tests = data;
        console.log(this.tests);
        console.log("tate");
      },
      (error) => {
        console.error('Error al recuperar les dades:', error);
      }
    );
  }
}
