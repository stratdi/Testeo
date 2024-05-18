import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { TestFormComponent } from 'src/app/shared/components/test-form/test-form.component';

@Component({
  selector: 'test-edit-page',
  templateUrl: './test-edit.page.html',
  styleUrls: ['./test-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TestFormComponent, IonButtons, IonBackButton]
})
export class TestEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
