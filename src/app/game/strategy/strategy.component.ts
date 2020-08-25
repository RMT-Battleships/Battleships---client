import { Component, Input, OnInit } from '@angular/core';

import { Board } from "../interfaces/board";
import { BoardService } from "../services/board.service";
import { ShipService } from "../services/ship.service";
import { Ship } from "../interfaces/ship";

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
  providers: [ShipService]
})
export class StrategyComponent implements OnInit {
  board: Board;
  selectedShip: Ship;
  coordinates: { x: number, y: number };

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
    this.coordinates = {
      x: coordinates.row,
      y: coordinates.col
    }
  }

}
