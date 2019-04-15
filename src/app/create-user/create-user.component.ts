import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AddUserCarrier } from '../models/addUserCarrier';
import { HttpService } from '../http.service';
import { Carrier } from '../models/Carrier';
import { stringify } from '@angular/core/src/util';
import { Validators } from '@angular/forms';



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

export class CreateUserDialog {

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    carrierName: new FormControl('', Validators.required)
  });


  

  public carriersSet: Carrier[];

  public selected;

  constructor(
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

}
