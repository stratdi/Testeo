import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/angular/standalone';
import { TestForm } from 'src/app/models/test-form.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';


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
  testFavorite: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
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
    if (this.testId != null) {
      this.prepareUpdate();
    }
  }

  private async prepareUpdate() {
    if (this.testId) {
      this.testService.getTestById(this.testId).subscribe(
        (test) => {
          this.testFavorite = test.favorite;
          this.testForm.patchValue(test);
        },
        (error) => {
          console.error("Error carregant les dades:", error);
          this.toastService.create("Error carregant les dades...", "bottom", false);
        }
      );
    }
  }

  async onSubmit(action: string) {
    console.log("Invalid form?", this.testForm.invalid);

    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched();
      await this.toastService.create("El formulari té errors.", "bottom", false);
      return;
    }

    this.test = this.testForm.value;
    this.test.favorite = this.testFavorite;

    if (action === "simple") {
      this.testService.saveTest(this.test, this.testId).subscribe(
        (response) => {
          if (this.testId) {
            if (this.location) {
              this.location.back();
            }
            this.toastService.create("Test desat satisfactòriament.", "bottom", true);
          } else {
            this.testForm.reset();
            this.toastService.create("Test desat satisfactòriament.", "bottom", true);
          }
        },
        (error) => {
          console.error("Error desant el test:", error);

          this.toastService.create("Error desant el test...", "bottom", false);
        }
      );
    }

    if (action === "questions") {
      console.log(action, this.test);
    }

  }
}
