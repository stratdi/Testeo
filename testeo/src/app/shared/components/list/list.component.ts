import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonAlert, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSkeletonText, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Test } from 'src/app/models/test.interface';
import { TestService } from 'src/app/services/test.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  providers: [Location],
  imports: [RouterModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSkeletonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, ListComponent, IonAlert, IonText],
})
export class ListComponent {

  @Input() tests?: Test[];
  @Input() header?: string;
  @Input() loading: boolean = true;
  @Input() emptyHeader?: string;
  @Input() emptySubheader?: string;
  @Input() emptyImage?: string;
  @Input() favoriteMode: boolean = false;

  constructor(
    private testService: TestService,
    private toastService: ToastService
  ) {
  }

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
        this.fetchTests();
        this.toastService.create("Test eliminat satisfactòriament.", "bottom", true);
      }, error => {
        console.error(error);
        this.toastService.create("Error eliminant el test...", "bottom", false);
      });
    }
  }

  fetchTests() {
    let tests;

    if (this.favoriteMode) {
      tests = this.testService.getFavoriteTests();
    } else {
      tests = this.testService.getTests();
    }

    tests.subscribe(
      (data) => {
        this.tests = data;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.toastService.create("No s'ha pogut obtenir el llistat dels tests...", "bottom", false);
      }
    );
  }
}
