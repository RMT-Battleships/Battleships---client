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
        onTurn: false,
        outcome: false,
        sunkShipsArray: [],
        sunkShipsNumber: 0,
        score: [0, 0]
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

  setShip(ship: Ship, boardId = 0): boolean {
    const boardSize = this.boards[boardId].cells.length;
    let startI = +ship.y - 1;
    startI = startI < 0 ? 0 : startI;
    let startJ = +ship.x - 1;
    startJ = startJ < 0 ? 0 : startJ;
    let endI;
    let endJ;

    if (boardId == 0 && this.overlap(this.boards[boardId].cells, ship)){
      return false;
    }

    if(boardId != 0) {
      this.boards[0].player.sunkShipsNumber++;
    }

    if (ship.horizontal) {
      if (ship.length + +ship.x <= boardSize) {
        endI = +ship.y + 1;
        endI = endI === boardSize ? endI - 1 : endI;

        endJ = +ship.x + ship.length;
        endJ = endJ === boardSize ? endJ - 1 : endJ;

        for (let i = startI; i <= endI; i++) {
          for (let j = startJ; j <= endJ; j++) {
            console.log(i + " " + j);
            if (j >= ship.x && j < +ship.x + ship.length && i == ship.y) {
              this.boards[boardId].cells[i][j].value = 'ship';
            } else {
              console.log('postavio');
              this.boards[boardId].cells[i][j].value = 'lock';
              console.log(this.boards[boardId].cells[i][j].value);
            }
            if(boardId == 0) {
              this.boards[boardId].cells[i][j].hit = false;
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
            console.log(i + " " + j);
            if (i >= ship.y && i < +ship.y + ship.length && j == ship.x) {
              this.boards[boardId].cells[i][j].value = 'ship';
            } else {
              console.log('postavio');
              this.boards[boardId].cells[i][j].value = 'lock';
            }
            if(boardId == 0) {
              this.boards[boardId].cells[i][j].hit = false;
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

  setPoints(points: number[]) {
    this.boards[0].player.score = points;
  }

  setOnTurn(turn) {
    this.boards[0].player.onTurn = turn;
  }

  setOutcome(outcome) {
    this.boards[0].player.outcome = outcome;
  }

  getOutcome() {
    return this.boards[0].player.outcome;
  }
}
