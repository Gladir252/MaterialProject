import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';
import { LoginUser } from '../models/loginUser';
import { HttpClient } from '@angular/common/http';
import { TokenInterceptorService } from '../token-interceptor.service';
import { Router } from '@angular/router';

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

  submit(user:LoginUser) {
      const body = {email: this.form.value.username, password: this.form.value.password};
      //console.log(body);
      this.http.login(body).subscribe(
        (res)=>{
          console.log(res);
          localStorage.setItem('token', res);
          this.router.navigate(['home']);
        },
        (err)=>{
          console.log(err);
        }
      );
      
      //this.http.post('http://localhost:50133/api/auth/Login',body, {responseType:'text'}).subscribe(result => console.log(result));
  }
  @Input() error: string | null;
  
  constructor(private http:HttpService, private router:Router) { }

  ngOnInit() {
  }

}
