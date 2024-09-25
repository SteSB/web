import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Msg {
  user: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'web';
  message: string = '';
  name: string | null = '';
  messages: Msg[] = [];

  constructor(private webSocketService: WebsocketService) {
    this.name = prompt('Inserisci il tuo nome')

    this.webSocketService.messages.subscribe(msg => {
      this.messages.push(JSON.parse(msg));
    });    
  }

  protected sendMessage() {
    if (this.message && this.name) {
      this.webSocketService.sendMessage(JSON.stringify({user: this.name, message: this.message}));
      this.message = '';
    }
  }

}
