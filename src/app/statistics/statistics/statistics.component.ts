import { CasherService } from './../../core/services/casher/casher.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  findSomaLucroMes$: any;
  findMediaLucroMes$: any;
  resultVendasUltimosSeteDias$: any;
  resultVendasUltimosTrintaDias$: any;
  resultMediaDiariaMesAnterior$: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private casher: CasherService
  ) { }

  mediaForm = this.fb.group({
    mes: [''],
    ano: ['']
  });

  somaLucroMesForm = this.fb.group({
    mes: [''],
    ano: ['']
  });

  onSubmitMediaMes() {
    this.casher.findMediaLucro(this.mediaForm.value.mes, this.mediaForm.value.ano).subscribe(
      (res) => {
        this.findMediaLucroMes$ = res;
        this.findMediaLucroMes$ = this.findMediaLucroMes$[0][1];
      });
  }

  onSubmitSomaLucroMes() {
    this.casher.findSomaLucroMes(this.somaLucroMesForm.value.mes, this.somaLucroMesForm.value.ano).subscribe(
      (res) => {
        this.findSomaLucroMes$ = res;
        this.findSomaLucroMes$ = this.findSomaLucroMes$[0][1];
      });
  }
  ngOnInit(): void {
    this.casher.findVendasUltimosSeteDias().subscribe(
      (res) => {
        this.resultVendasUltimosSeteDias$ = res;
      });
    this.casher.findVendasUltimosTrintaDias().subscribe(
      (res) => {
        this.resultVendasUltimosTrintaDias$ = res;
      });
    this.casher.findMediaDiariaMesAnterior().subscribe(
      (res) => {
        this.resultMediaDiariaMesAnterior$ = res;
      });
  }

}
