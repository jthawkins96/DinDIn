import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordsMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordsMatchDirective, multi: true }]
})
export class PasswordsMatchDirective implements Validator {
  validate(formGroup: FormGroup): { [k: string]: boolean } {
    let passwordValue;

    for (let control in formGroup.controls) {
      const currentValue = formGroup.controls[control].value;
      if (passwordValue && currentValue !== passwordValue) return { passwordMismatch: true };

      passwordValue = currentValue;
    }

    return null;
  }
  constructor() {}
}
