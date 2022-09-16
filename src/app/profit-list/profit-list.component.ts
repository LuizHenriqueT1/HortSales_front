import { Casher } from './../core/models/casher';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { CasherService } from '../core/services/casher/casher.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-profit-list',
  templateUrl: './profit-list.component.html',
  styleUrls: ['./profit-list.component.scss'],
})
export class ProfitListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private casherService: CasherService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  profitList: Casher[] = [];

  profitList$: Observable<Casher[]> = EMPTY;
  dataSources = new MatTableDataSource<Casher>();

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
    this.dataSources.sort = this.sort;
  }

  ngOnInit(): void {
    this.profitList$ = this.casherService.findAll();
    this.findAll();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorteado ${sortState.direction} com final ordenado`);
    } else {
      this._liveAnnouncer.announce('Sorteado sem ordenação');
    }
  }
}
