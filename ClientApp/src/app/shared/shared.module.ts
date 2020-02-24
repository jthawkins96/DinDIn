import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';



@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [ValidationMessageComponent]
})
export class SharedModule { }
