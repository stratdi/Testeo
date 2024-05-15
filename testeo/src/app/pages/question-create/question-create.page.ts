import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { QuestionFormComponent } from 'src/app/shared/components/question-form/question-form.component';

@Component({
  selector: 'question-create',
  templateUrl: './question-create.page.html',
  styleUrls: ['./question-create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, QuestionFormComponent, IonButtons, IonBackButton]
})
export class QuestionFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
