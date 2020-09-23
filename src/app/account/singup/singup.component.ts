import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    email: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z0-9.]+)\.([a-zA-Z]{2,5})$')]),
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
          this.show = true;
          this.signupForm.reset();
          console.log("postoji");
        }
        else{
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
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
