import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonSkeletonText, IonTitle, IonToolbar, IonIcon, IonButton, IonAlert } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user.interface';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonIcon, IonLabel, IonSkeletonText, IonButton, IonAlert],
})
export class UserProfilePage {
  user?: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ionViewWillEnter() {
    this.fetchUser();
  }

  fetchUser() {
    this.authenticationService.getUser().subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
        console.log("tate");
      },
      (error) => {
        console.error('Error al recuperar les dades:', error);
      }
    );
  }

  public signoutButtons = [
    {
      text: 'Cancel·la',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Accepta',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.authenticationService.logout().then(() => {
          console.log('Sessió tancada.');
          this.router.navigate(['/login']);
        }).catch(error => {
          console.error('Error tancant la sessió:', error);
        });
      },
    },
  ];
}
