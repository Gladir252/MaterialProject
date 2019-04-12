import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserCarrier } from './table/table.component';
import { LoginUser } from './models/loginUser';
import { Router } from '@angular/router';
import { RegistrationUser } from './models/registrationUser';

const BASE_URL = 'http://localhost:50133/api/';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(private http:HttpClient, private router:Router) { }



  getCarriers(){
    return this.http.get<UserCarrier[]>(BASE_URL+'admin/GetAllUsers');
  }

  login(body:LoginUser){
     return this.http.post(BASE_URL+'auth/Login', body,{responseType:'text'})//.subscribe((result)=>{
    //   console.log(result)      
    // }, (err)=>{console.log(err)});
  }

  registration(body:RegistrationUser){
    return this.http.post(BASE_URL+'auth/Registration', body,{responseType:'text'})
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['home'])
  }

  deleteUser(id:number){
    return this.http.delete(BASE_URL+`admin/DeleteUser/${id}`,{responseType:'text'});
  }

  getToken(){
    localStorage.getItem('token');
  }

}