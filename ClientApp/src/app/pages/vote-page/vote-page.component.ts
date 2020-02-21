import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/_services/signal-r.service';
import { MealOption } from 'src/app/_interfaces/meal-option.model';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {

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

  updateVoteCounts(mealId: number) {
    this.mealOptions.forEach(mealOption => {
      if(mealOption.id === mealId)
        mealOption.votes++;
    });
  }
}
