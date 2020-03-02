import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { VoteComponent } from './modules/vote/pages/vote/vote.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
