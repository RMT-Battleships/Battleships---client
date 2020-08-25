import { Component, Input, OnInit } from '@angular/core';

import { Board } from "../interfaces/board";
import { BoardService } from "../services/board.service";

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {
  board: Board;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.board = this.boardService.getBoards()[0];
  }

}
