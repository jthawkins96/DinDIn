import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { TestModel } from '../_interfaces/test.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  apiBaseUrl: string = environment.apiUrl;

  constructor() {}

  public data: TestModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${ this.apiBaseUrl }/test-hub`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  };

  public broadcastData = () => {
    this.hubConnection.invoke("broadcasttestdata", "new data")
      .catch(err => console.log(err))
  }

  public addTestEventListener = () => {
    this.hubConnection.on('testevent', data => {
      this.data = data;
      console.log(data);
    });
  };
}
