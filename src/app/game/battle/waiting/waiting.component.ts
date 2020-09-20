import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private webSocketServe: WebSocketService) { }

  ngOnInit(): void {
  }

}
