import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonItem, IonList, IonSkeletonText, IonButton, IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonNote } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test.interface';
import { DetailsComponent } from 'src/app/shared/components/details/details.component';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.page.html',
  styleUrls: ['./test-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, DetailsComponent, IonContent, IonTitle, IonIcon, IonButton, IonButtons, IonBackButton, IonToolbar, IonHeader]
  // imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonLabel, IonItem, IonList, IonSkeletonText, IonButton, IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonNote]
})
export class TestDetailPage implements OnInit {
  test?: Test;

  constructor(private route: ActivatedRoute,
    private testService: TestService) { }

  ngOnInit(): void {
    this.loadTest();
  }

  /**
   * Refrescam el detall quan l'usuari fa 'back' de l'edició.
   */
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.loadTest();
  }

  loadTest(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.testService.getTestById(+id).subscribe(test => this.test = test);
    }
  }

  toggleFavorite() {
    if (this.test != null) {
      const favorite = !this.test.favorite;

      this.testService.setFavorite(this.test.id, favorite).subscribe(response => {
        if (this.test != null) {
          this.test.favorite = favorite;
        }
      });
    }
  }

}
