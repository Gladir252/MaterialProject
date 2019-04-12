import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationUser } from '../models/registrationUser';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    companyName: new FormControl(''),
    phone: new FormControl('')
  });

  submit(user:RegistrationUser) {
    const body = {email: this.form.value.email, password: this.form.value.password, firstName: this.form.value.firstName,
    lastName: this.form.value.lastName, companyName: this.form.value.companyName, phone: this.form.value.phone};
    //console.log(body);
    this.http.registration(body).subscribe(
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
