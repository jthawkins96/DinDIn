import { Component, OnInit } from '@angular/core';
import { SignalRService } from './_services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private signalRService: SignalRService, private http: HttpClient) { }

  // ngOnInit() {
  //   this.signalRService.startConnection();
  //   this.signalRService.addTestEventListener();
  //   this.startHttpRequest();
  // }

  // private startHttpRequest = () => {
  //   this.http.get('https://localhost:44309/api/chart')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }
}
