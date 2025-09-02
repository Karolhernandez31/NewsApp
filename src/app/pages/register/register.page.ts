import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  constructor(
    private userSrv: UserService,
    private toastSrv: ToastService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  isKeyboardVisible = false;

  // Detectar cuando el teclado se muestra/oculta
  @HostListener('window:keyboardWillShow', ['$event'])
  onKeyboardShow(event: any) {
    this.isKeyboardVisible = true;
    this.adjustForKeyboard(true);
  }

  @HostListener('window:keyboardWillHide', ['$event'])
  onKeyboardHide(event: any) {
    this.isKeyboardVisible = false;
    this.adjustForKeyboard(false);
  }

  // Ajustar la interfaz para el teclado
  private adjustForKeyboard(visible: boolean) {
    const content = document.querySelector('ion-content');
    const formContainer = document.querySelector('.form-container');

    if (visible) {
      // Hacer scroll al campo activo
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement && content) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }

  onRegisterSubmit(userData: any) {
    console.log('Datos de registro:', userData);
    const success = this.userSrv.registerUser(userData);
    if (!success) {
      this.toastSrv.show('El correo electrónico ya está en uso', 'danger');
      return;
    }
    this.toastSrv.show('Registro completado correctamente', 'success');
    this.router.navigate(['/login']);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

}
