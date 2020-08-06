import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableService } from './table.service';
// config = {
//   displayColumns: [userName, mobile, etc...],
//   columnsHeaders" [User name, Mobile Phone],
//   dataSource: [user1: IUser]
// templateRef?: <html></html>
// }

export interface ITableConfig {
  displayedColumns: string[];
  columnHeaders: string[];
  dataSource: [];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() config: ITableConfig;
  displayedColumns = ['checked', 'user', 'resetPassword', 'mobile', 'desktop', 'singUpMobile', 'singUpDesktop', 'lastLogin', 'promo_code', 'spaceUsed', 'tier', 'status'];
  columnHeaders = ['Checked', 'User', 'Reset password', 'Mobile', 'Desktop', 'Sing up mobile', 'Sing up desktop', 'Last login', 'Promo', 'Space used', 'Tier', 'Status'];
  dataSource = new MatTableDataSource<UserInterface>(userData);


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public tableService: TableService,
  ) {
  }


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
  }

}

export interface UserInterface {
  checked: boolean;
  user: string;
  resetPassword: string;
  mobile: string;
  desktop: string;
  singUpMobile: string;
  singUpDesktop: string;
  lastLogin: string;
  promo_code: boolean;
  spaceUsed: string;
  tier: number;
  status: boolean;
}

const userData: UserInterface[] = [
  {
    checked: false,
    user: 'q.mason_jr@yahoo.com',
    resetPassword: '',
    mobile: 'paid',
    desktop: 'paid',
    singUpMobile: '07/20/2020',
    singUpDesktop: '07/20/2020',
    lastLogin: '07/20/2020',
    promo_code: true,
    spaceUsed: '1 mb',
    tier: 14.99,
    status: false
  },
  {
    checked: false,
    user: 'as.mason_jr@yahoo.com',
    resetPassword: '',
    mobile: null,
    desktop: 'paid',
    singUpMobile: '07/20/2020',
    singUpDesktop: '07/20/2020',
    lastLogin: '09/04/2020',
    promo_code: false,
    spaceUsed: '1 mb',
    tier: 9.99,
    status: false
  },
  {
    checked: false,
    user: 'vd.mason_jr@yahoo.com',
    resetPassword: '',
    mobile: 'paid',
    desktop: 'REGISTERED',
    singUpMobile: '07/20/2020',
    singUpDesktop: '03/01/2020',
    lastLogin: '10/18/2019',
    promo_code: true,
    spaceUsed: '1 mb',
    tier: 9.99,
    status: true
  },
];


