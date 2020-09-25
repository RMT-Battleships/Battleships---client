import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { BoardService } from "../../services/board.service";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {
  outcome: boolean; points: number; pointswin: number;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.outcome = this.boardService.getOutcome();
    this.points = this.boardService.getPoints();
    this.pointswin = this.points + 12;
    //console.log(this.outcome);
    //console.log("POENI" + " " + this.points);
  }

}
