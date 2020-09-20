import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css']
})
export class AccInfoComponent implements OnInit {

  username: string = "";
  name: string = "";
  surname: string = "";
  email: string = "";

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.checkIfUsernameExist(this.authService.getUsername()).subscribe(
      (result)=>{
        this.username = result[0].document.fields.username.stringValue;
        this.name = result[0].document.fields.name.stringValue;
        this.surname = result[0].document.fields.surname.stringValue;
        this.email = result[0].document.fields.email.stringValue;
      }
    )
  }

}
