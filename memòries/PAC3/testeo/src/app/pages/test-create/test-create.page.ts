import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
import { TestFormComponent } from 'src/app/shared/components/test-form/test-form.component';

@Component({
  selector: 'test-create',
  templateUrl: 'test-create.page.html',
  styleUrls: ['test-create.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, TestFormComponent]
})
export class TestCreatePage {

  constructor() { }

}
