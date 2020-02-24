import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/home/pages/home/home.component';
import { VoteComponent } from '../modules/vote/pages/vote/vote.component';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'vote', component: VoteComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
