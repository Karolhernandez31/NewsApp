import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Country } from 'src/app/interfaces/country';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastService } from 'src/app/shared/services/toast.service';

export const passwordMatchValidator: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  countries: Country[] = [];

  constructor(
    private userSrv: UserService,
    private formBuilder: FormBuilder,
    private httpSrv: HttpService,
    private toastSrv: ToastService,
    private loaderSrv: LoaderService,
    private router: Router
  ) {
    this.registerForm = this.createForm();
  }

  ngOnInit() {
    this.loadCountries();
  }

  createForm(): FormGroup {
    return this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[^\d]*$/), // No números
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[^\d]*$/), // No números
          ],
        ],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  async loadCountries() {
    await this.loaderSrv.present('Loading countries...');
    this.httpSrv
      .get<any>('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((res) => {
        this.countries = res.data;
        console.log('Countries loaded', this.countries);
        this.loaderSrv.hide();
      })
      .catch((err) => {
        console.error('Error loading countries', err);
        this.loaderSrv.hide();
      });
  }

  get confirmPasswordInvalid() {
    return this.registerForm.get('confirmPassword')?.invalid;
  }

  async onSubmit() {
    await this.loaderSrv.present('Submitting form...');
    const user = {
      ...this.registerForm.value,
      country: this.getCountry(this.registerForm.value.country) || '',
    };
    const b = this.userSrv.registerUser(user);
    if (b) {
      this.toastSrv.show('User registered successfully', 'success');
      this.router.navigate(['/login']);
      this.registerForm.reset();
    } else {
      this.toastSrv.show('Email is already in use', 'danger');
    }
    this.loaderSrv.hide();
  }

  private getCountry(iso2: string): Country | undefined {
    return this.countries.find((c) => c.iso2 === iso2);
  }

  isInvalid(controlName: string, error?: string): boolean {
    const control = this.registerForm.get(controlName);
    if (!control) return false;

    if (error) {
      return control.hasError(error) && (control.dirty || control.touched);
    }

    return control.invalid && (control.dirty || control.touched);
  }
}
