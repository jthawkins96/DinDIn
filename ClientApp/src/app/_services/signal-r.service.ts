import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { TestModel } from '../_interfaces/test.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  constructor() {}

  public data: TestModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44309/test-hub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  };

  public addTestEventListener = () => {
    this.hubConnection.on('testevent', data => {
      this.data = data;
      console.log(data);
    });
  };
}
