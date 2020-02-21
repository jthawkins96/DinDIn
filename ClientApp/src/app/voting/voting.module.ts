import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingManagerComponent } from './voting-manager/voting-manager.component';



@NgModule({
  declarations: [VotingManagerComponent],
  imports: [
    CommonModule
  ],
  exports: [VotingManagerComponent]
})
export class VotingModule { }
