import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIRDPROJECT_API } from './thirdproject.api';
 
@Injectable()
export class ShowPostService {
 
    constructor(private http: HttpClient){
 
    }
     
    findAll(page:number,count:number){
        return this.http.get(`${THIRDPROJECT_API}/api/posts/${page}/${count}`);
      }
 
}