import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Row } from '../rang/row';


interface UserData{
  name: string;
  surname: string,
  email: string,
  username: string,
  password: string
  result: number
}

interface UserResult{
  document?: {
    createTime: string,
    fields:{
      username:{stringValue:string},
      result:{integerValue:number}
    },
    name:string,
    updateTime:string
  },
  readTime: Date
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
      result:{integerValue:number}
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
        },
        result:{
          integerValue:0
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

  getResults(){
    const queryObj =  
        { structuredQuery: 
            { from: [
                { collectionId: 'users' 
            }
        ], 
        orderBy: [
            { field: 
                { fieldPath: 'result' 
            }, direction: 'DESCENDING' }
        ], select: { fields: 
            [
                { fieldPath: 'username' }, 
                { fieldPath: 'result' }
            ] 
        }, 
        
            limit: 10
            } 
        }
        return this.http.post<UserResult[]>(this.queryUserurl, queryObj).pipe(
          map((res) => {
            const rows: Row[] = [];
            console.log(res);
            res.forEach(result => {
              const row = new Row(result.document.fields.username.stringValue,
                result.document.fields.result.integerValue);
                rows.push(row);
            })
            return rows;
          })
        )

  }

  

  setUsername(username: string) {
    this.loggedInUser = username;
  }

  getUsername() {
    return sessionStorage.getItem('token');
    // return this.loggedInUser;
  }

  getUserByUsername(username:string){
    
  }
  
}
