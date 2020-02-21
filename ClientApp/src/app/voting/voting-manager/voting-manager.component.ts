import { Component, OnInit, Input } from '@angular/core';
import { SignalRService } from 'src/app/_services/signal-r.service';

@Component({
  selector: 'app-voting-manager',
  templateUrl: './voting-manager.component.html',
  styleUrls: ['./voting-manager.component.css']
})
export class VotingManagerComponent implements OnInit {

  @Input() mealOptions: any;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
  }

  vote(mealId: number) {
    this.signalRService.invokeHubMethod('voteonmeal', mealId);
  }

}
