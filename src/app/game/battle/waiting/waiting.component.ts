import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private webSocketServe: WebSocketService,
              private router: Router) { }

  ngOnInit(): void {
    this.webSocketServe.listen('paired').subscribe(() => {
      this.router.navigate(['/game/battle']);
    });
  }

}

