import { Injectable } from '@angular/core';

import { Player } from '../interfaces/player';
import { Board } from '../interfaces/board';
import { Ship } from '../interfaces/ship';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  playerId = 1;
  boards: Board[] = [];

  constructor() { }

  createBoard(size: number = 10) {
    const newCells = [];

    for (let i = 0; i < size; i++) {
      newCells[i] = [];
      for (let j = 0; j < size; j++) {
        newCells[i][j] = {hit: false, points: 0, value: 'sea'};
      }
    }

    const newPlayer: Player = {
        id: this.playerId++,
        score: 0
      };
    const board: Board = {
        player: newPlayer,
        cells: newCells
      };

    this.boards.push(board);
  }

  getBoards(): Board[] {
    return this.boards;
  }

  setShip(ship: Ship): boolean {
    const boardSize = this.boards[0].cells.length;
    let startI = +ship.y - 1;
    startI = startI < 0 ? 0 : startI;
    let startJ = +ship.x - 1;
    startJ = startJ < 0 ? 0 : startJ;
    let endI;
    let endJ;

    if (this.overlap(this.boards[0].cells, ship)){
      return false;
    }

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
              this.boards[0].cells[i][j].hit = false;
            } else {
              this.boards[0].cells[i][j].points = -1;
              this.boards[0].cells[i][j].value = 'lock';
              this.boards[0].cells[i][j].hit = false;
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
              this.boards[0].cells[i][j].value = 'lock';
            }
          }
        }

        return true;
      }
    }
    return false;
  }

  protected overlap(board, ship) {

    const xMax = (ship.horizontal) ? +ship.x + +ship.length : +ship.x + 1;
    const yMax = (ship.horizontal) ?  +ship.y + 1 : +ship.y + +ship.length;

    for (let i = ship.y; i < yMax; i++) {
      for (let j = ship.x; j < xMax; j++) {
        if (board[i][j].value !== 'sea') {
          return true;
        }
      }
    }
    return false;
  }

}
