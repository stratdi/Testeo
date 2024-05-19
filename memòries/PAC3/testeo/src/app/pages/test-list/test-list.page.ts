import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { Test } from '../../models/test.interface';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'test-list',
  templateUrl: 'test-list.page.html',
  styleUrls: ['test-list.page.scss'],
  standalone: true,
  imports: [ListComponent, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TestListPage {
  tests?: Test[];

  constructor(private testService: TestService) { }

  ionViewWillEnter() {
    this.fetchTests();
  }

  fetchTests() {
    this.testService.getTests().subscribe(
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
