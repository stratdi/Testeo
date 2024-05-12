import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';

@Component({
  selector: 'test-favorites',
  templateUrl: 'test-favorites.page.html',
  styleUrls: ['test-favorites.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class TestFavoritesPage {
  constructor() { }
}
