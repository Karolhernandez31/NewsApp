
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtr: LoadingController) { }

  async present(message: string = 'Loading...') {
    if (!this.loading) {
      this.loading = await this.loadingCtr.create({
        message,
        spinner: 'crescent',
        cssClass: 'custom-loader',
      });
      await this.loading.present();
    }
  }

  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
