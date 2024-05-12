import { Component } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonSkeletonText } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { Test } from '../../models/test.interface';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonLabel, IonSkeletonText],
})
export class UserProfilePage {
  constructor(private testService: TestService) { }
}
