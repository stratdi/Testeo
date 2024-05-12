import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton } from '@ionic/angular/standalone';
import { TestForm } from 'src/app/models/test-form.interface';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton]
})
export class TestFormComponent implements OnInit {

  @Input() test: TestForm;

  testForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {
    this.test = {
      title: '',
      description: ''
    };

    this.testForm = this.formBuilder.group({
      title: [this.test ? this.test.title : '', [Validators.required, Validators.maxLength(50)]],
      description: [this.test ? this.test.description : '', [Validators.required, Validators.maxLength(255)]],
      successScore: [this.test ? this.test.successScore : null],
      errorScore: [this.test ? this.test.errorScore : null]
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;
    // update
  }

  async onSubmit(action: string) {
    console.log("Invalid form?", this.testForm.invalid);

    if (this.testForm.invalid) {
      return;
    }

    this.test = this.testForm.value;

    if (action === "simple") {
      console.log(action, this.test);
      await this.presentToast("bottom");
    }
    if (action === "questions") {
      console.log(action, this.test);
    }

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 5000,
      position: position,
    });

    await toast.present();
  }

}
