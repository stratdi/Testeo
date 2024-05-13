import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton } from '@ionic/angular/standalone';
import { TestForm } from 'src/app/models/test-form.interface';
import { ToastController } from '@ionic/angular';
import { TestService } from 'src/app/services/test.service';

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

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private testService: TestService) {
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
      this.testForm.markAllAsTouched();
      await this.presentToast("El formulari té errors.", "bottom", false);
      return;
    }

    this.test = this.testForm.value;


    if (action === "simple") {
      console.log(action, this.test);
      this.testService.saveTest(this.test).subscribe(
        (response) => {
          this.testForm.reset();
          this.presentToast("Test desat satisfactòriament.", "bottom", true);
        },
        (error) => {
          console.error("Error desant el test:", error);
          this.presentToast("Error desant el test...", "bottom", false);
        }
      );
    }

    if (action === "questions") {
      console.log(action, this.test);
    }

  }

  async presentToast(text: string, position: 'top' | 'middle' | 'bottom', success: boolean) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000,
      position: position,
      color: success ? 'success' : 'danger',
    });

    await toast.present();
  }

}
