import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Row } from './row';

@Component({
  selector: 'app-rang',
  templateUrl: './rang.component.html',
  styleUrls: ['./rang.component.css']
})
export class RangComponent implements OnInit {

  username: string = "";
  results: Row[];

  constructor(private authService:AuthService) { }

  ngOnInit(): void { 
    this.authService.getResults().subscribe(
      (res) =>{
        console.log(res[0]);
        console.log(res[0].document.fields.username.stringValue);
        console.log(res[0].document.fields.result.numberValue);
        //console.log(res[0]);
        console.log(res[1].document.fields.username.stringValue);
        console.log(res[1].document.fields.result.numberValue);
       
      }
    )
  }

}
