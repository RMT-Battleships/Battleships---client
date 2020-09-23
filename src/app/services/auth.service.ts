import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators'
interface UserData{
  name: string;
  surname: string,
  email: string,
  username: string,
  password: string
}

interface QueryResult{
  document?: {
    createTime: string,
    fields:{
      email:{stringValue:string},
      name:{stringValue:string},
      password:{stringValue:string},
      surname:{stringValue:string},
      username:{stringValue:string},
    }
    readTime:string
  },
  readTime: Date
}


interface UserLogin{
  username:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://firestore.googleapis.com/v1/projects/rmt-battleships/databases/(default)/documents/users';
  private queryUserurl = 'https://firestore.googleapis.com/v1/projects/rmt-battleships/databases/(default)/documents:runQuery';
  constructor(private http:HttpClient) { }

  private loggedInUser: string;
  private loggedIn: boolean = false;

  login(){
    this.loggedIn = true;
  }

  getLoggedIn(){
    return this.loggedIn;
  }

  userLoggedIn(){
    return !!sessionStorage.getItem('token');
  }

  signup(user:UserData){
    const userObj = {
      fields:{
        username:{
          stringValue:user.username
        },
        password:{
          stringValue:user.password
        },
        email:{
          stringValue:user.email
        },
        name:{
          stringValue:user.name
        },
        surname:{
          stringValue:user.surname
        }
      }
    }
    return this.http.post(this.authUrl, userObj);
  }

  checkIfUsernameExist(username:string){
    const queryObj = {
          structuredQuery: { 
              from: [{ 
                  collectionId: "users", 
                  allDescendants: true 
              }], 
              where: {
                  fieldFilter: { 
                      field: {
                          fieldPath: "username" 
                      }, 
                      op: "EQUAL", 
                      value: { 
                          stringValue: username
                      }
                  } 
              } 
          }
      } 
      return this.http.post<QueryResult[]>(this.queryUserurl, queryObj);
  }

  

  setUsername(username: string) {
    this.loggedInUser = username;
  }

  getUsername() {
    return this.loggedInUser;
  }

  getUserByUsername(username:string){
    
  }
  
}
