import { Component, OnInit } from '@angular/core';
import { SignalRService } from './_services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  apiBaseUrl: string = environment.apiUrl;

  constructor(private signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTestEventListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get(`${ this.apiBaseUrl }/test`)
      .subscribe(res => {
        console.log(res);
      })
  }

  broadcastNewData() {
    this.signalRService.broadcastData();
  }
}
