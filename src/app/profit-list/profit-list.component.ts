import { Casher } from './../core/models/casher';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, merge, Observable, startWith, switchMap } from 'rxjs';
import { CasherService } from '../core/services/casher/casher.service';

@Component({
  selector: 'app-profit-list',
  templateUrl: './profit-list.component.html',
  styleUrls: ['./profit-list.component.scss'],
})
export class ProfitListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private casherService: CasherService, private router: Router) {}

  profitList: Casher[] = [];

  profitList$: Observable<Casher[]> = EMPTY;
  dataSources = new MatTableDataSource<Casher>(this.profitList);

  displayedColumns: string[] = ['dataDoValor', 'lucroDia'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }

  findAll() {
    this.casherService.findAll().subscribe((resp) => {
      this.dataSources.data = resp;
    });
  }

  onClickHome() {
    this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    this.dataSources.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.profitList$ = this.casherService.findAll();
    this.findAll();
  }
}
