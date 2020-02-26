import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  apiBaseUrl: string = environment.apiUrl;

  constructor() {}

  private hubConnection: signalR.HubConnection;

  public startConnection = (hubName: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${ this.apiBaseUrl }/${ hubName }`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(`%cConnection to ${ hubName } started.`, 'color:green'))
      .catch(err => console.log(`%cError while starting connection: ${ err }`, 'color:red'));
  };

  public invokeHubMethod = (methodName: string, data) => {
    this.hubConnection.invoke(methodName, data)
      .catch(err => console.log(err))
  }

  public addHubListener = (eventName: string, cb) => {
    this.hubConnection.on(eventName, cb);
  };
}
