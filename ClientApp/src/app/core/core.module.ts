import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeaderComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    CoreRoutingModule
  ]
})
export class CoreModule { }
