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
  currentNumberOfPlayersInRoom: number = 2; //for now it is hardcoded, later it will be sent from server

  constructor(private boardService: BoardService,private webSocketService: WebSocketService ) { }

  ngOnInit(): void {
  }

  get boards () : Board[] {
    return this.boardService.getBoards()
  }

  fireTorpedo(data){
    this.webSocketService.emit('torpedo',[data.col,data.row]);
  }
}
