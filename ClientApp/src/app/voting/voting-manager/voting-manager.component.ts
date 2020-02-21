import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/_services/signal-r.service';

@Component({
  selector: 'app-voting-manager',
  templateUrl: './voting-manager.component.html',
  styleUrls: ['./voting-manager.component.css']
})
export class VotingManagerComponent implements OnInit {

  mealOptions: any;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
  }

  vote(mealId: number) {

  }

}
