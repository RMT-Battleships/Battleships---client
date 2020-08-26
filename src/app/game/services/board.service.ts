import { Injectable } from '@angular/core';

import { Player } from "../interfaces/player";
import { Board } from "../interfaces/board";
import { Ship } from "../interfaces/ship";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  playerId: number = 1;
  boards: Board[] = [];

  constructor() { }

  createBoard(size: number = 10) {
    let cells = [];

    for (let i = 0; i < size; i++) {
      cells[i] = [];
      for (let j = 0; j < size; j++) {
        cells[i][j] = {hit: false, points: 0, value: 'sea'};
      }
    }

    let newPlayer: Player = {
        id: this.playerId++,
        score: 0
      },
      board: Board = {
        player: newPlayer,
        cells: cells
      }

    this.boards.push(board);
  }

  getBoards(): Board[] {
    return this.boards;
  }

  setShip(ship: Ship): boolean {
    let boardSize = this.boards[0].cells.length;
    let startI = +ship.y - 1;
    startI = startI < 0 ? 0 : startI;
    let startJ = +ship.x - 1;
    startJ = startJ < 0 ? 0 : startJ;
    let endI, endJ;

    if (ship.horizontal) {
      if (ship.length + +ship.x <= boardSize) {
        endI = +ship.y + 1;
        endI = endI === boardSize ? endI - 1 : endI;

        endJ = +ship.x + ship.length;
        endJ = endJ === boardSize ? endJ - 1 : endJ;

        for (let i = startI; i <= endI; i++) {
          for (let j = startJ; j <= endJ; j++) {
            if (j >= ship.x && j < +ship.x + ship.length && i == ship.y) {
              this.boards[0].cells[i][j].points = ship.length;
              this.boards[0].cells[i][j].value = 'ship';
            } else {
              this.boards[0].cells[i][j].points = -1;
            }
          }
        }
        return true;
      }
    } else {
      if (ship.length + +ship.y <= boardSize) {
        endI = +ship.y + ship.length;
        endI = endI === boardSize ? endI - 1 : endI;

        endJ = +ship.x + 1;
        endJ = endJ === boardSize ? endJ - 1 : endJ;

        for (let i = startI; i <= endI; i++) {
          for (let j = startJ; j <= endJ; j++) {
            if (i >= ship.y && i < +ship.y + ship.length && j == ship.x) {
              this.boards[0].cells[i][j].points = ship.length;
              this.boards[0].cells[i][j].value = 'ship';
            } else {
              this.boards[0].cells[i][j].points = -1;
            }
          }
        }

        return true;
      }
    }
    return false;
  }

}
