import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input('dados') chartData$!:  Observable<ChartData | { labels: string[]; datasets: { data: number[]; label: string;}[]; }>;
  @Input('typeChart') typeChart: any;
  @Input('labels') labels: any;

    config: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            let finalValue = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
            return finalValue;
          }
        }
      },
    },
  };


  constructor() { }

  ngOnInit() {
  }

}
