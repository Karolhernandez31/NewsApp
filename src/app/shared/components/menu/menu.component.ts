import { User } from './../../../interfaces/user';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent implements OnInit {
  @Input() contentId!: string;
  constructor(private menuController: MenuController, private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}
  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    this.menuController.close();
  }

   async openSettings() {
    this.menuController.close('main-menu');
    const modal = await this.modalCtrl.create({
      component: UserUpdateComponent,
    });
    return await modal.present();
  }
}
