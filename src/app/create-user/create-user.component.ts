import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AddUserCarrier } from '../models/addUserCarrier';
import { HttpService } from '../http.service';
import { Carrier } from '../models/Carrier';
import { stringify } from '@angular/core/src/util';
import { Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})


export class CreateUserComponent {



  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialog, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})

export class CreateUserDialog implements OnInit{

  // form: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   confirmPassword: new FormControl('', [Validators.required]),
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   phone: new FormControl('', Validators.required),
  //   carrierName: new FormControl('')
  // });
  form:FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required, Validators.minLength(12), Validators.apply],
      carrierName: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  })
  
  }


  public carriersSet: Carrier[];

  public selected;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserCarrier, private http: HttpService) {
    http.getCarriers().subscribe((res: Carrier[]) => {
      this.carriersSet = res;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick() {
    const body = {
      email: this.form.value.email,
      password: this.form.value.password,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      carrierName: String(this.selected).substring(0, String(this.selected).indexOf(','))
    };
    console.log(body);
    this.http.addUserCarrier(body).subscribe(
      (res) => { 
        console.log(res);
        //window.location.reload();
      });

    this.dialogRef.close();
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}