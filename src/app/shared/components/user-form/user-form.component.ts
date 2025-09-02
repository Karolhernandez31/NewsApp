import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { LoaderService } from '../../services/loader.service';
import { Country } from 'src/app/interfaces/country';
import { User } from 'src/app/interfaces/user';
import { EncryptService } from '../../services/encrypt.service';

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
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: false,
})
export class UserFormComponent implements OnInit {
  @Input() mode: 'register' | 'edit' = 'register';
  @Input() userData?: User;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  userForm: FormGroup;
  countries: any[] = [];
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpSrv: HttpService,
    private loaderSrv: LoaderService,
    private encryptSrv: EncryptService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    this.loadCountries();
    if (this.mode === 'edit' && this.userData) {
      this.patchValuesFomrData();
    }
  }

  patchValuesFomrData() {
    this.userForm.patchValue({ ...this.userData });
    this.userForm.get('confirmPassword')?.setValue(this.userData?.password);
    this.userForm.get('country')?.setValue(this.userData?.country?.iso2);
  }

  isInvalid(controlName: string, error?: string): boolean {
    const control = this.userForm.get(controlName);
    if (!control) return false;

    if (error) {
      return control.hasError(error) && (control.dirty || control.touched);
    }

    return control.invalid && (control.dirty || control.touched);
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

  onSubmit() {
    const user = {
      ...this.userForm.value,
      country: this.getCountry(this.userForm.value.country) || '',
      password: this.encryptSrv.encryptPassword(this.userForm.value.password)
    };
    console.log('Form submitted', user);
    this.formSubmit.emit(user);
  }

  onCancel() {
    this.formCancel.emit();
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  private getCountry(iso2: string): Country | undefined {
    return this.countries.find((c) => c.iso2 === iso2);
  }

  getSelectedCountry(): any {
  const countryCode = this.userForm.get('country')?.value;
  if (!countryCode) return null;

  return this.countries.find(country => country.iso2 === countryCode);
}

onCountryChange(country: any): void {
  if (country) {
    this.userForm.get('country')?.setValue(country.iso2);
    this.userForm.get('country')?.markAsTouched();
  } else {
    this.userForm.get('country')?.setValue('');
  }

  // Trigger validation
  this.userForm.get('country')?.updateValueAndValidity();
}
}
