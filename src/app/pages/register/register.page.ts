import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
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

  onRegisterSubmit(userData: any) {
    console.log('Datos de registro:', userData);
    const success = this.userSrv.registerUser(userData);
    if (!success) {
      this.toastSrv.show('El correo electrónico ya está en uso', 'danger');
      return;
    }
    this.toastSrv.show('Registro completado correctamente', 'success');
    this.router.navigate(['/home']);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

}
