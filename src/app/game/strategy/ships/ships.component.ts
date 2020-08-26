import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShipService } from "../../services/ship.service";
import { Ship } from "../../interfaces/ship";

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  @Output() selectedShipEmitter = new EventEmitter<Ship>();

  selectedRow: number;
  selectedCol: number;

  constructor(private shipService: ShipService) {
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
    this.selectedRow = +e.target.id.slice(0,1);
    this.selectedCol = +e.target.id.slice(1.2);

    this.shipService.rotateShip(this.selectedRow,this.selectedCol);
    this.selectedShipEmitter.emit(this.ships[this.selectedRow][this.selectedCol]);
  }

  get ships () {
    return this.shipService.getShips();
  }
}
