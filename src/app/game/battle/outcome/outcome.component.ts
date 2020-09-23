import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/web-socket.service';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {
  outcome: boolean;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.outcome = this.webSocketService.getOutcome();
  }

}
