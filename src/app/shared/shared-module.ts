import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
  UserFormComponent,
  UserUpdateComponent,
  ModalComponent,
  InputComponent,
  HeaderComponent
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
