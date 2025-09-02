import { User } from './../../../interfaces/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { MenuEventsService } from '../../services/menu-events.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent implements OnInit {

  @Input() contentId!: string;
  user!: User | null;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private menuEvents: MenuEventsService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  onClick(category: string) {
    this.menuEvents.emitirClick(category);
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    this.menuController.close();
  }

  async openProfile() {
    this.menuController.close('main-menu');
    const modal = await this.modalCtrl.create({
      component: UserUpdateComponent,
    });
    return await modal.present();
  }

  loadUser() {
    const userData = localStorage.getItem('loggedUser');
    this.user = userData ? JSON.parse(userData) : null;
  }
}
