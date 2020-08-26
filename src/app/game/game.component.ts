import { Component, OnInit } from '@angular/core';

import { BoardService } from "./services/board.service";

const REQUIRED_NUMBER_OF_PLAYERS: number = 2;
const BOARD_SIZE: number = 10;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [BoardService]
})
export class GameComponent implements OnInit {
  gameId: string;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.createBoards();
  }

  createBoards() : GameComponent {
    for (let i = 0; i < REQUIRED_NUMBER_OF_PLAYERS; i++)
      this.boardService.createBoard(BOARD_SIZE);
    return this;
  }
}
