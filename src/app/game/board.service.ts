import { Injectable } from '@angular/core';

import { Player } from "./player";
import { Board } from "./board";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  playerId: number = 1;
  boards: Board[] = [];

  constructor() { }

  createBoard(size:number = 10) {
    let cells = [];

    for(let i=0; i < size; i++) {
      cells[i] = [];
      for(let j=0; j< size; j++) {
        cells[i][j] = { hit: false, points: 0, value: '' };
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

  getBoards() : Board[] {
    return this.boards;
  }
}
