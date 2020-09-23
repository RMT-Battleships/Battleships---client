import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  show:boolean = false;
  emailCorrect:boolean = false;

  signupForm:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    // confirmedPassword: new FormControl('', Validators.required),
  })
  constructor(private authService: AuthService, protected router: Router) { }

  ngOnInit(): void {
  }

  onSignup(){
    this.authService.checkIfUsernameExist(this.signupForm.get('username').value).subscribe(
      (result)=>{
        if(result[0].hasOwnProperty('document')){
          this.emailCorrect = false;
          this.show = true;
          this.signupForm.reset();
          console.log("postoji");
        }
        else{
          this.show = false;
          let reg = /^([a-zA-Z0-9.]+)@([a-zA-Z0-9.]+)\.([a-zA-Z]{2,5})$/;
          if(!reg.test(this.signupForm.get('email').value)){
            console.log("poske ifa");
            this.emailCorrect = true;
            this.signupForm.reset();
          }
          else{
            this.emailCorrect = false;
            this.authService.signup(this.signupForm.value).subscribe(
              (result)=>{
                console.log(result);
              },
              (error) =>{
                console.log(error);
              }
            );
            this.router.navigate(['/login']);
          }
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
