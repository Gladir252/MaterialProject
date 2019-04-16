import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, FormControlDirective, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserDialog } from '../create-user/create-user.component';
import { MustMatch } from '../_helpers/must-match.validator';
import { Carrier } from '../models/Carrier';
import { AddUserCarrier } from '../models/addUserCarrier';


export interface UserCarrier {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  addForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    carrierName: new FormControl()
  });

  dataSource: any;
  public carriersSet: UserCarrier[];
  displayedColumns: string[] = ['first name', 'last name', 'phone', 'link', 'delete', 'edit'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.http.getUserCarriers().subscribe((result: UserCarrier[]) => {
    this.carriersSet = result;
      this.dataSource = new MatTableDataSource(this.carriersSet);
      this.dataSource.sort = this.sort;
    });
  }

  clickDelete(carrier: UserCarrier) {
    console.log(carrier);
    if (confirm(`Are you sure to delete ${carrier.firstName}?`)) {
      this.http.deleteUser(carrier.id).subscribe(res => console.log(res));
      window.location.reload();
    }
  }

  clickEdit(carrier: UserCarrier) {
    console.log(carrier);
  }
  @ViewChild(MatSort) sort: MatSort;

}












// @Component({
//   selector: 'app-edit-dialog',
//   templateUrl: 'edit-dialog.html',
// })

// export class CreateUserEditDialog implements OnInit{

//   editForm:FormGroup;

//   ngOnInit() {
//     this.editForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', [Validators.required]],
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       phone: ['', Validators.required, Validators.minLength(12), Validators.apply]
//     }, {
//       validator: MustMatch('password', 'confirmPassword')
//   })
  
//   }


//   public carriersSet: UserCarrier[];

//   public selected;

//   constructor(
//     private formBuilder: FormBuilder,
//     public dialogRef: MatDialogRef<CreateUserEditDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: UserCarrier, private http: HttpService) {
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//   onOkClick() {
//     const body = {
//       email: this.editForm.value.email,
//       password: this.editForm.value.password,
//       firstName: this.editForm.value.firstName,
//       lastName: this.editForm.value.lastName,
//       phone: this.editForm.value.phone
//     };
//     console.log(body);
//     this.http.editUserCarrier(this.editForm.value.id, body).subscribe(
//       (res) => { 
//         console.log(res);
//         //window.location.reload();
//       });

//     this.dialogRef.close();
//   }

// }