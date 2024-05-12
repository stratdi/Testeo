import { Component } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonSkeletonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { Test } from '../../models/test.interface';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'test-list',
  templateUrl: 'test-list.page.html',
  styleUrls: ['test-list.page.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonLabel, IonSkeletonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon],
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
        console.error('Error al recuperar datos:', error);
      }
    );
  }

}
