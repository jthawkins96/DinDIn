import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './pages/vote/vote.component';
import { VotingManagerComponent } from './components/voting-manager/voting-manager.component';
import { VoteHomeComponent } from './components/vote-home/vote-home.component';
import { VoteRoutingModule } from './vote-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    VoteComponent,
    VotingManagerComponent,
    VoteHomeComponent
  ],
  imports: [CommonModule, VoteRoutingModule, RouterModule],
  exports: [VoteComponent, RouterModule]
})
export class VoteModule {}
