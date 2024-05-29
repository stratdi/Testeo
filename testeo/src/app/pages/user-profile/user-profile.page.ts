import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonSkeletonText, IonTitle, IonToolbar, IonIcon, IonButton, IonAlert } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user.interface';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonIcon, IonLabel, IonSkeletonText, IonButton, IonAlert],
})
export class UserProfilePage {
  user?: User;

  constructor(
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ionViewWillEnter() {
    this.fetchUser();
  }

  fetchUser() {
    this.authenticationService.getUser().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
        this.toastService.create("No s'ha pogut obtenir les dades de l'usuari...", "bottom", false);
      }
    );
  }

  public signoutButtons = [
    {
      text: 'Cancel·la',
      role: 'cancel'
    },
    {
      text: 'Accepta',
      role: 'confirm',
      handler: () => {
        this.authenticationService.logout().then(() => {
          this.router.navigate(['/login']);
        }).catch(error => {
          console.error(error);
          this.toastService.create("No s'ha pogut tancar la sessió.", "bottom", false);
        });
      },
    },
  ];
}
