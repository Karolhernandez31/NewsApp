import { NgModule } from '@angular/core';

import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/shared/shared-module';
import { RegisterPageRoutingModule } from './register-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
