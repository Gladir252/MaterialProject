import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCarrier } from './table/table.component';
import { LoginUser } from './models/loginUser';
import { Router } from '@angular/router';
import { RegistrationUser } from './models/registrationUser';
import { AddUserCarrier } from './models/addUserCarrier';
import { Carrier } from './models/Carrier';
import { EditUserCarrier } from './models/editUserCarrier';

const BASE_URL = 'http://localhost:50133/api/';
@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient, private router: Router) { }


  addUserCarrier(body: AddUserCarrier) {
    return this.http.post(BASE_URL + 'admin/CreateUser', body, { responseType: 'text' })
  }

  editUserCarrier(id:number, body:EditUserCarrier) {
    return this.http.put(BASE_URL + `admin/EditUser/${id}`, body);
  }

  getUserCarriers() {
    return this.http.get<UserCarrier[]>(BASE_URL + `admin/GetAllUsers`);
  }

  getCarriers() {
    return this.http.get<Carrier[]>(BASE_URL + 'admin/GetAllCarriers');
  }

  login(body: LoginUser) {
    return this.http.post(BASE_URL + 'auth/Login', body, { responseType: 'text' })
  }

  registration(body: RegistrationUser) {
    return this.http.post(BASE_URL + 'auth/Registration', body, { responseType: 'text' })
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['home'])
  }

  deleteUser(id: number) {
    return this.http.delete(BASE_URL + `admin/DeleteUser/${id}`, { responseType: 'text' });
  }

  getToken() {
    localStorage.getItem('token');
  }

}