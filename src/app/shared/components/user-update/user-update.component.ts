import { EncryptService } from './../../services/encrypt.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ModalController,
} from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  standalone: false,
})
export class UserUpdateComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private router: Router,
    private toastSrv: ToastService,
    private modalCtrl: ModalController,
    private encryptSrv: EncryptService,
    private userSrv: UserService
  ) {}

  async ngOnInit() {
    try {
      await this.loadUserData();
    } catch (err) {
      console.error('Error loading user data', err);
    } finally {
      console.log('User data finally:', this.currentUser);
    }
  }

  async loadUserData() {
    const userStr = localStorage.getItem('loggedUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr)
      this.currentUser.password = this.encryptSrv.decryptPassword(this.currentUser.password);
    }
  }

  onProfileUpdate(userData: any) {
    console.log('Datos actualizados:', userData);
    const b = this.userSrv.updateUser({...userData, id: this.currentUser.id});
    if (!b) {
      this.toastSrv.show('Error al actualizar el perfil', 'danger');
      return;
    }
    this.toastSrv.show('Perfil actualizado correctamente', 'success');
    this.router.navigate(['/home']);
    this.modalCtrl.dismiss();
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
