import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './pages/vote/vote.component';
import { VotingManagerComponent } from './components/voting-manager/voting-manager.component';

@NgModule({
  declarations: [
    VoteComponent,
    VotingManagerComponent
  ],
  imports: [CommonModule],
  exports: [VoteComponent]
})
export class VoteModule {}
