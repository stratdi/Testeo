import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonAlert, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  providers: [Location],
  imports: [RouterModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSkeletonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, ListComponent, IonAlert],
})
export class ListComponent {

  @Input() tests?: Test[];
  @Input() header?: string;

  constructor(
    private testService: TestService,
    private toastService: ToastService
  ) { }

  public deleteButtons = [
    {
      text: 'Cancel·la',
      role: 'cancel'
    },
    {
      text: 'Accepta',
      role: 'confirm'
    },
  ];

  delete(ev: any, testId: number) {
    if (ev.detail.role === 'confirm') {
      this.testService.deleteTest(testId).subscribe(() => {
        window.location.reload();
        this.toastService.create("Test eliminat satisfactòriament.", "bottom", true);
      }, error => {
        console.error('Error eliminant el test:', error);
        this.toastService.create("Error eliminant el test...", "bottom", false);
      });
    }
  }
}
