import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIRDPROJECT_API } from './thirdproject.api'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${THIRDPROJECT_API}/api/auth`, user);
  }

  createOrUpdate(user: User) {
    if (user.id != null && user.id != '') {
      return this.http.put(`${THIRDPROJECT_API}/api/user`, user)
    } else {
      user.id = null;
      return this.http.post(`${THIRDPROJECT_API}/api/user`, user)
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${THIRDPROJECT_API}/api/user/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${THIRDPROJECT_API}/api/user/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${THIRDPROJECT_API}/api/user/${id}`);
  }

  private loggedInStatus = false

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
}
