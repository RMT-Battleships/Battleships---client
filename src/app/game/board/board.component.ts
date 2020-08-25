import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Board } from "../interfaces/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() i: number = 0;
  @Input()  player: number = 0;
  @Output() coordinates = new EventEmitter<{boardId: number, row:number, col: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  emitCoordinates(e) {
    const cellId = e.target.id;
    this.coordinates.emit({
      boardId: cellId.substring(1,2),
      row: cellId.substring(2,3),
      col: cellId.substring(3,4)
    });
  }

}
