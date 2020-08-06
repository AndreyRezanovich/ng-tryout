import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface } from '../table/table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count = 5;

  displayedColumns = ['checked', 'user', 'resetPassword', 'mobile', 'desktop', 'singUpMobile', 'singUpDesktop', 'lastLogin', 'promo_code', 'spaceUsed', 'tier', 'status'];
  // dataSource = new MatTableDataSource<UserInterface>(userData);

  constructor(private dashboardService: DashboardService) {
  }


  ngOnInit(): void {

  }

}
