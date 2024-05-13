import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButtons, IonBackButton, IonLabel, IonItem, IonList, IonSkeletonText, IonButton, IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonNote, IonAlert]
})
export class DetailsComponent {
  @Input() test?: Test;

  constructor(
    private testService: TestService,
    private router: Router,
    private toastService: ToastService
  ) { }

  public deleteButtons = [
    {
      text: 'Cancel·la',
      role: 'cancel'
    },
    {
      text: 'Accepta',
      role: 'confirm',
      handler: () => {
        if (this.test) {
          this.testService.deleteTest(this.test.id).subscribe(() => {
            this.router.navigateByUrl('/tests/list', { replaceUrl: true });
            this.toastService.create("Test eliminat satisfactòriament.", "bottom", true);
          }, error => {
            console.error('Error eliminant el test:', error);
            this.toastService.create("Error eliminant el test...", "bottom", true);
          });
        }
      },
    },
  ];
}
