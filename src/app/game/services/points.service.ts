import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface QueryResult{
  document?: {
    name: string,
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

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private apiUrl:string = "https://firestore.googleapis.com/v1";
  private queryUserurl = 'https://firestore.googleapis.com/v1/projects/rmt-battleships/databases/(default)/documents:runQuery';
  constructor(private http:HttpClient) { }

  getUserData(username:string){
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
      return this.http.post<QueryResult[]>(this.queryUserurl, queryObj).pipe(
        map(result=>{
          return result[0];
        })
      )
  }

  updatePoints(userRecordName:string, points:number){
    const resultObj = {
      fields:{
        result:{
          integerValue:points
        }
      }
    }
    return this.http.patch(`${this.apiUrl}/${userRecordName}?updateMask.fieldPaths=result`, resultObj);
  }

}
