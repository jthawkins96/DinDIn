import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) {}

  ngOnInit(): void {}

  onLogin() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.authService.login(username, password).subscribe(
      response => {
        this.alertifyService.success("Welcome back!");
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
