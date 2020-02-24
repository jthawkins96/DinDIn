import { Component, OnInit, Input } from '@angular/core';

import { validationMessages } from './validation-messages';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  validationMessages;
  @Input() control;

  get errorKey() {
    if(this.control.errors)
      return Object.keys(this.control.errors)[0];

    return 'none';
  }


  constructor() { }

  ngOnInit() {
    this.validationMessages = validationMessages;
  }

}
