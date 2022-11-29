import { RequestService } from 'src/app/core/services/request/request.service';
import { ChartData } from 'chart.js';
import { map, Observable } from 'rxjs';
import { CasherService } from './../../core/services/casher/casher.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  findSomaLucroMes$: any;
  findMediaLucroMes$: any;
  resultVendasUltimosSeteDias$: any;
  resultVendasUltimosTrintaDias$: any;
  resultMediaDiariaMesAnterior$: any;
  produtoMaisPedidoUltimosTrintaDias$: any;

  vendasUltimosDozeMeses$!: Observable<ChartData>;

  constructor(
    private fb: FormBuilder,
    private casher: CasherService,
    private requestService: RequestService,
    private router: Router
  ) {}

  mediaForm = this.fb.group({
    mes: [''],
    ano: [''],
  });

  somaLucroMesForm = this.fb.group({
    mes: [''],
    ano: [''],
  });

  onClickHome() {
    this.router.navigate(['/']);
  }

  onSubmitMediaMes() {
    this.casher
      .findMediaLucro(this.mediaForm.value.mes, this.mediaForm.value.ano)
      .subscribe((res) => {
        this.findMediaLucroMes$ = res;
        this.findMediaLucroMes$ = this.findMediaLucroMes$[0][1];
      });
  }

  onSubmitSomaLucroMes() {
    this.casher
      .findSomaLucroMes(
        this.somaLucroMesForm.value.mes,
        this.somaLucroMesForm.value.ano
      )
      .subscribe((res) => {
        this.findSomaLucroMes$ = res;
        this.findSomaLucroMes$ = this.findSomaLucroMes$[0][1];
      });
  }

  arrayFaturamento: any;
  faturamentosUltimosDozeMeses(): number[] {
    let array: number[] = [];
    this.casher.findVendasUltimosDozeMeses().subscribe((res) => {
      this.arrayFaturamento = res;
      this.arrayFaturamento.reverse();
      for (const element of this.arrayFaturamento) {
        array.push(element[2]);
      }
    });
    return array;
  }

  labelsMes = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  labels() {
    const data = new Date();
    let mes = data.getMonth();
    let ano = data.getFullYear();

    let labels: string[] = [];

    for (let i = 0; i < 12; i++) {
      if (mes == 0) {
        mes = 12;
        ano--;
      }
      labels.push(this.labelsMes[mes] + '/' + ano);
      mes--;
    }
    return labels.reverse();
  }

  arrayFaturamentosUltimosDozeMeses = this.faturamentosUltimosDozeMeses();
  chart(): Observable<ChartData> {
    return new Observable<ChartData>((observer) => {
      observer.next({
        labels: this.labels(),
        datasets: [
          {
            label: 'Faturamentos',
            data: this.arrayFaturamentosUltimosDozeMeses,
            backgroundColor: '#024d01',
            borderColor: '#027a00',
            borderWidth: 2,
          },
        ],
      });
    });
  }

  showChart: Observable<ChartData> = this.chart();
  loadingChart: any;

  ngOnInit(): void {
    this.casher.findVendasUltimosSeteDias().subscribe((res) => {
      this.resultVendasUltimosSeteDias$ = res;
    });
    this.casher.findVendasUltimosTrintaDias().subscribe((res) => {
      this.resultVendasUltimosTrintaDias$ = res;
    });
    this.casher.findMediaDiariaMesAnterior().subscribe((res) => {
      this.resultMediaDiariaMesAnterior$ = res;
    });

    let arrayProdutoMaisPedidosUltimosTrintaDias: any;
    let value: string;
    this.requestService
      .findProdutoMaisPedidosUltimosTrintaDias()
      .pipe(
        map((x: any) => {
          arrayProdutoMaisPedidosUltimosTrintaDias = x;
          arrayProdutoMaisPedidosUltimosTrintaDias.map((res: string) => {
            value = res[0];
            value = value.replace(/(^\w)/g, (letra) => letra.toUpperCase());
            this.produtoMaisPedidoUltimosTrintaDias$ = value;
          });
        })
      )
      .subscribe();

    setTimeout(() => {
      this.loadingChart = this.showChart;
    }, 500);
  }

  showValue(value: any) {
    let showValue = value?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    return showValue;
  }
}
