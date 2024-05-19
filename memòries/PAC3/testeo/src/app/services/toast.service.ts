import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async create(text: string, position: 'top' | 'middle' | 'bottom', success: boolean) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000,
      position: position,
      color: success ? 'success' : 'danger',
    });

    await toast.present();
  }


}