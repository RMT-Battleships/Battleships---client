import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { BoardService } from "../../services/board.service";
import { AuthService } from 'src/app/services/auth.service';
import { PointsService } from '../../services/points.service';


@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {
  outcome: boolean; points: number; pointswin: number;
  username: string;
  constructor(private boardService: BoardService, private authService: AuthService, private pointsService:PointsService) { }

  ngOnInit(): void {
    // i ovo je zakomentarisano zbog testiranja
    this.outcome = this.boardService.getOutcome();
    this.points = this.boardService.getPoints();
    this.pointswin = this.points + 12;
    this.username = this.authService.getUsername();
    this.onSetPoints();
    /*this.outcome = true;
    this.points = 10;
    this.pointswin = 22;*/
  
    //console.log(this.outcome);
    //console.log("POENI" + " " + this.points);
  }

  onSetPoints(){
    this.pointsService.getUserData(this.username).subscribe(res=>{
      const currentPoints:number = res.document.fields.result.integerValue;
      let newPoints:number = this.points;
      if(this.outcome){
        newPoints = this.pointswin;
      }
      if(currentPoints===0  || newPoints > currentPoints){
        const userRecordName: string = res.document.name;
        this.pointsService.updatePoints(userRecordName, newPoints).subscribe(res=>{
          console.log(res)
        })
      }else{
        console.log('trenutni rez je gori od najboljeg')
      }
    })
  }

}
