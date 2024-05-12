import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test.interface';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonSkeletonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSkeletonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, ListComponent],
})
export class ListComponent {

  @Input() tests?: Test[];
  @Input() header?: string;

}
