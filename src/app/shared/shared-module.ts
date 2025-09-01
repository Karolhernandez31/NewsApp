import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [UserFormComponent,UserUpdateComponent, ModalComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    UserFormComponent,
    UserUpdateComponent,
    ModalComponent
  ],
})
export class SharedModule {}
