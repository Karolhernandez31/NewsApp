import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private menuController: MenuController) {}

  openMenu() {
    console.log('Opening menu');
    this.menuController.open('main-menu');
  }

}
