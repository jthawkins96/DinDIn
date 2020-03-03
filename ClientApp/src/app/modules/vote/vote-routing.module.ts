import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VoteHomeComponent } from './components/vote-home/vote-home.component';
import { VotingManagerComponent } from './components/voting-manager/voting-manager.component';
import { VoteComponent } from './pages/vote/vote.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'vote',
    component: VoteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VoteHomeComponent },
      { path: ':id', component: VotingManagerComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class VoteRoutingModule {}
