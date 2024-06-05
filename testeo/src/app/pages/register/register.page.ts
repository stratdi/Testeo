import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { key, mail, person } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import { IonInput, IonButton, IonIcon, IonItem, IonContent, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonInput, IonButton, IonIcon, IonItem, IonContent, IonNote]
})
export class RegisterPage implements OnInit {

  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
    private toastService: ToastService
  ) {
    addIcons({ person, key, mail });
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.register(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true });
        this.toastService.create("L'usuari s'ha enregistrat satisfactòriament", "bottom", true);
      },
      async (res) => {
        await loading.dismiss();
        this.toastService.create("Error enregistrar l'usuari...", "bottom", false);
      }
    );
  }

  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

  get email() {
    return this.credentials.get('email');
  }

  async login() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }


}
