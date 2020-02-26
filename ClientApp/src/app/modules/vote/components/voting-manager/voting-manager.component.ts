import { Component, OnInit, Input } from '@angular/core';
import { SignalRService } from 'src/app/core/services/signal-r.service';
import { MealOption } from 'src/app/shared/models/meal-option.model';

@Component({
  selector: 'app-voting-manager',
  templateUrl: './voting-manager.component.html',
  styleUrls: []
})
export class VotingManagerComponent implements OnInit {

  mealOptions: MealOption[] = [
    { id: 1, title: 'Chicken', votes: 0 },
    { id: 2, title: 'Beef', votes: 0 },
    { id: 3, title: 'Pork', votes: 0 }
  ]

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection('voting-hub');
    this.signalRService.addHubListener('mealvote', this.updateVoteCounts.bind(this));
  }

  vote(mealId: number) {
    this.signalRService.invokeHubMethod('voteonmeal', mealId);
  }

  updateVoteCounts(mealId: number) {
    this.mealOptions.forEach(mealOption => {
      if(mealOption.id === mealId)
        mealOption.votes++;
    });
  }

}
