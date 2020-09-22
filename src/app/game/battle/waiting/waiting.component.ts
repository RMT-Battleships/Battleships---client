import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import {Router} from "@angular/router";
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private webSocketServe: WebSocketService,
              private router: Router,
              private shipService: ShipService) { }

  ngOnInit(): void {
    this.webSocketServe.listen('paired').subscribe((roomOwner) => {
      this.webSocketServe.setRoomOwner(roomOwner);
      console.log(this.shipService.getPlacedShips());
      this.webSocketServe.emit('strategy' , [this.webSocketServe.getRoomOwner(), this.shipService.getPlacedShips()]);
      this.router.navigate(['/game/battle']);
    });

  }

}

