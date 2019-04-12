import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';


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

export class TableComponent implements OnInit {

  dataSource:any;
  public carriersSet: UserCarrier[];
  displayedColumns: string[] = ['name', 'logo', 'status', 'but'];

  constructor(private http:HttpService) { 
      this.http.getCarriers().subscribe((result:UserCarrier[]) => { this.carriersSet = result;
      this.dataSource = new MatTableDataSource(this.carriersSet);
      this.dataSource.sort = this.sort;
    });
  }

  clickDelete(carrier:UserCarrier){
    console.log(carrier);
    if(confirm(`Are you sure to delete ${carrier.firstName}?`)){
      this.http.deleteUser(carrier.id).subscribe(res=>console.log(res));
      window.location.reload();
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

}
