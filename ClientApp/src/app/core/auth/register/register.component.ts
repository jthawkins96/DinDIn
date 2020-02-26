import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm', { static: false}) registerForm: NgForm;
  @ViewChild('username', { static: false}) username: NgModel;
  @ViewChild('password', { static: false}) password: NgModel;
  errorMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void { }

  onRegister() {
    this.errorMessage = null;
    this.authService.register(this.username.value, this.password.value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.errorMessage = error.error;
      }
    );
  }
}
