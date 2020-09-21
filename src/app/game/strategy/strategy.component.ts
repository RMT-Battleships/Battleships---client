import { Component, OnInit } from '@angular/core';

import { Board } from '../interfaces/board';
import { BoardService } from '../services/board.service';
import { ShipService } from '../services/ship.service';
import { Ship } from '../interfaces/ship';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
  providers: [ShipService]
})
export class StrategyComponent implements OnInit {
  board: Board;
  selectedShip: Ship;

  constructor(private boardService: BoardService,
              private shipService: ShipService) { }

  ngOnInit(): void {
    this.board = this.boardService.getBoards()[0];
    this.shipService.createShips();
  }

  setSelectedShip(element) {
    this.selectedShip = element;
  }

  setCoordinates(coordinates) {
    if (this.shipService.getShips().length > 0){
      const shipForPlacing: Ship = {
        x: coordinates.col,
        y: coordinates.row,
        length: this.selectedShip.length,
        hits: 0,
        horizontal: this.selectedShip.horizontal
      };

      if (this.boardService.setShip(shipForPlacing)){
        this.selectedShip = this.shipService.placeShip(shipForPlacing);
      }
    }
  }


}
