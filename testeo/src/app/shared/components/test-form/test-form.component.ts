import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/angular/standalone';
import { TestForm } from 'src/app/models/test-form.interface';
import { Test } from 'src/app/models/test.interface';
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

  @Input() testModel!: Test;
  test: TestForm;
  testForm: FormGroup;
  testId?: number;
  testFavorite: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {

    this.test = {
      title: '',
      description: ''
    };

    this.testForm = this.formBuilder.group({
      title: [this.test ? this.test.title : '', [Validators.required, Validators.maxLength(50)]],
      description: [this.test ? this.test.description : '', [Validators.required, Validators.maxLength(255)]],
      successScore: [this.test ? this.test.successScore : null, [Validators.max(999.99), Validators.min(0)]],
      errorScore: [this.test ? this.test.errorScore : null, [Validators.max(0), Validators.min(-999.99)]]
    });
  }

  ngOnInit(): void {
    if (this.testModel != null) {
      this.prepareUpdate();
    }
  }

  private prepareUpdate() {
    this.testFavorite = this.testModel.favorite;
    this.testForm.patchValue(this.testModel);
    this.testId = this.testModel.id;
  }

  async onSubmit(action: string) {
    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched();
      await this.toastService.create("El formulari té errors.", "bottom", false);
      return;
    }

    this.test = this.testForm.value;
    this.test.favorite = this.testFavorite;

    this.testService.saveTest(this.test, this.testId).subscribe(
      (response) => {
        // Edició
        if (this.testId) {
          if (action === "end" && this.location) {
            this.location.back();
          } else if (action === "addQuestion") {
            this.router.navigateByUrl(`tests/list/${this.testId}/questions`, { replaceUrl: true });
          }
        } //Creació
        else {
          if (action === "addQuestion") {
            this.router.navigateByUrl(`tests/create/${response}/questions`, { replaceUrl: false });
          }
          this.testForm.reset();
        }

        this.toastService.create("Test desat satisfactòriament.", "bottom", true);
      },
      (error) => {
        console.error(error);
        this.toastService.create("No s'ha pogut desar el test...", "bottom", false);
      }
    );
  }
}
