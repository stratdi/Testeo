import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { QuestionFormComponent } from 'src/app/shared/components/question-form/question-form.component';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.page.html',
  styleUrls: ['./question-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, QuestionFormComponent, IonBackButton, IonButtons]
})
export class QuestionEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
