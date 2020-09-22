import { Component, DoCheck, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { ShipService } from "../../services/ship.service";
import { Ship } from "../../interfaces/ship";
import { WebSocketService } from '../../services/web-socket.service';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements DoCheck, OnInit{
  @Output() selectedShipEmitter = new EventEmitter<Ship>();

  selectedRow: number;
  selectedCol: number;

  constructor(private shipService: ShipService,
              private webSockeService: WebSocketService,
              protected router: Router) {
  }

  ngOnInit(): void {
  }


  selectedShip(e){
    this.selectedRow = +e.target.id.slice(0,1);
    this.selectedCol = +e.target.id.slice(1.2);

    this.selectedShipEmitter.emit(this.ships[this.selectedRow][this.selectedCol]);
  }

  glowClass(i, j) {
    return (i === this.selectedRow && j === this.selectedCol) ? 'selected' : '';
  }

  rotateShip(e) {
    this.selectedRow = +e.target.id.slice(0, 1);
    this.selectedCol = +e.target.id.slice(1.2);

    this.shipService.rotateShip(this.selectedRow, this.selectedCol);
    this.selectedShipEmitter.emit(this.ships[this.selectedRow][this.selectedCol]);
  }

  get ships () {
    return this.shipService.getShips();
  }

  ngDoCheck(): void {
    if (this.shipService.getShips().length === 0){
      this.webSockeService.emit('ready',[]);
      this.router.navigate(['/game/waiting']);
    }
  }


}
