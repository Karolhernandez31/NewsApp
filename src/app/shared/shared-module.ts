import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { PrincipalNewsComponent } from './components/principal-news/principal-news.component';
import { ButtonComponent } from './components/button/button.component';
import { MenuComponent } from './components/menu/menu.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';

const COMPONENTS = [
  UserFormComponent,
  UserUpdateComponent,
  ModalComponent,
  InputComponent,
  HeaderComponent,
  CardComponent,
  PrincipalNewsComponent,
  ButtonComponent,
  CountrySelectComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ...COMPONENTS
  ],
})
export class SharedModule {}
