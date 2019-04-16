import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateUserDialog } from '../create-user/create-user.component';
import { EditUserCarrier } from '../models/editUserCarrier';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent {


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialog, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-dialog.html',
})



export class EditUserDialog implements OnInit {

  form: FormGroup;
  public selected;

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required, Validators.minLength(12), Validators.apply]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      })

  }


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditUserCarrier, private http: HttpService) {
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
    };
    console.log(body);
    this.http.editUserCarrier(this.form.value.id, body).subscribe(
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




