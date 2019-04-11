import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Carrier } from './table/table.component';

const BASE_URL = 'http://localhost:50133/api/';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(private http:HttpClient) { }

  getCarriers(){
    return this.http.get<Carrier[]>(BASE_URL+'admin/GetAllCarriers');
  }
  login(body:any){
    return this.http.post(BASE_URL+'auth/Login', body)
  }
}
