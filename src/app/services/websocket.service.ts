import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  public messages: Subject<string>;

  constructor() {
    this.messages = new Subject<string>();
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:5000'); 
    
    this.socket.onmessage = (event) => {
      this.messages.next(event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  public sendMessage(message: string) {
    this.socket.send(message);
  }
}
