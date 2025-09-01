import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastColor =
  | 'success'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'medium'
  | 'tertiary';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtr: ToastController) {}

  async show(message: string, type: ToastColor) {
    const toast = await this.toastCtr.create({
      message: message,
      duration: 2000,
      color: type,
      position: 'top',
    });

    await toast.present();
  }
}
