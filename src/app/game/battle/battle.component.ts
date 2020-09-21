import { Component, Input, OnInit } from '@angular/core';

import { Board } from "../interfaces/board";
import { BoardService } from "../services/board.service";
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() reuiredNumberOfPlayersForGame: number = 2;

  player: number = 0;
  isOnTurn = 0;
  currentNumberOfPlayersInRoom: number = 2; //for now it is hardcoded, later it will be sent from server

  constructor(private boardService: BoardService,private webSocketService: WebSocketService ) { }

  ngOnInit(): void {
    this.webSocketService.listen('update').subscribe((data: any) => {
        this.isOnTurn = data.turn;
        let matrix = [];
        for (let i = 0; i < 10; i++){
          matrix.push([]);
          for(let j = 0; j < 10; j++){
            matrix[i].push(data.grid[i * 10 + j]);
          }
        }
        this.boardService.boards[data.gridIndex].cells = data.matrix;
    });
  }

  get boards () : Board[] {
    return this.boardService.getBoards()
  }

  fireTorpedo(data){
    this.webSocketService.emit('torpedo',[data.col, data.row]);
  }
}
