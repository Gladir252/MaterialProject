import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';


export interface Carrier {
  id: number;
  carrierName: string;
  carrierLogo: string;
  status: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  dataSource:any;
  public carriersSet: Carrier[];
  displayedColumns: string[] = ['id', 'name', 'logo', 'status'];

  constructor(private http:HttpService) { 
      this.http.getCarriers().subscribe((result:Carrier[]) => { this.carriersSet = result;
      this.dataSource = new MatTableDataSource(this.carriersSet);
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

}
