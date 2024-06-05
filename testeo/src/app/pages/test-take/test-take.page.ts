import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { TakeFormComponent } from 'src/app/shared/components/take-form/take-form.component';

@Component({
  selector: 'app-test-take',
  templateUrl: './test-take.page.html',
  styleUrls: ['./test-take.page.scss'],
  standalone: true,
  imports: [TakeFormComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class TestTakePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
