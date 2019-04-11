import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';
import { User } from '../models/loginUser';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { text } from '@angular/core/src/render3';


export interface LoginUser{
  email:string;
  password:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit(user:User) {
      const body = {email: this.form.value.username, password: this.form.value.password};
      //console.log(body);
      
      this.http.post('http://localhost:50133/api/auth/Login',body, {responseType='text'}).subscribe();
  }
  @Input() error: string | null;
  
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

}
