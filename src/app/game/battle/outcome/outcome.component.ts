import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/web-socket.service';
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {
  outcome: boolean;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.outcome = this.boardService.getOutcome();
  }

}
