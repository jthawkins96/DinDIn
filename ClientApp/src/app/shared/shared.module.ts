import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { PasswordsMatchDirective } from './validators/template/passwords-match.directive';


@NgModule({
  declarations: [ValidationMessageComponent, PasswordsMatchDirective],
  imports: [
    CommonModule
  ],
  exports: [ValidationMessageComponent, PasswordsMatchDirective]
})
export class SharedModule { }
