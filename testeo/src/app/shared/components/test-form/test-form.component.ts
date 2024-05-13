import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonItem, IonInput, IonTextarea, IonList, IonLabel, IonButton } from '@ionic/angular/standalone';
import { TestForm } from 'src/app/models/test-form.interface';
import { ToastController, NavController } from '@ionic/angular';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute } from '@angular/router';


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
  testId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private testService: TestService,
    private route: ActivatedRoute,
    private location: Location) {

    this.test = {
      title: '',
      description: ''
    };

    const testIdString = this.route.snapshot.paramMap.get('id');
    if (testIdString) {
      this.testId = parseInt(testIdString);
    }

    this.testForm = this.formBuilder.group({
      title: [this.test ? this.test.title : '', [Validators.required, Validators.maxLength(50)]],
      description: [this.test ? this.test.description : '', [Validators.required, Validators.maxLength(255)]],
      successScore: [this.test ? this.test.successScore : null, [Validators.max(999.99), Validators.min(0)]],
      errorScore: [this.test ? this.test.errorScore : null, [Validators.max(0), Validators.min(-999.99)]]
    });
  }

  ngOnInit(): void {
    console.log("TEST ID", this.testId)
    if (this.testId != null) {
      this.prepareUpdate();
    }
  }

  private async prepareUpdate() {
    if (this.testId) {
      this.testService.getTestById(this.testId).subscribe(
        (test) => {
          this.testForm.patchValue(test);
        },
        (error) => {
          console.error("Error carregant les dades:", error);
          this.presentToast("Error carregant les dades...", "bottom", false);
        }
      );
    }
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
      this.testService.saveTest(this.test, this.testId).subscribe(
        (response) => {
          if (this.testId) {
            if (this.location) {
              this.location.back();
            }
            this.presentToast("Test desat satisfactòriament.", "bottom", true);
          } else {
            this.testForm.reset();
            this.presentToast("Test desat satisfactòriament.", "bottom", true);
          }
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
