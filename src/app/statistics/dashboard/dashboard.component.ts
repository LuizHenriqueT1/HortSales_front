import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input('dados') chartData$!:  Observable<ChartData>;
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
            let finalValue = value.toFixed(2);
            return 'R$' + finalValue.replace('.', ',');
          }
        }
      },
    },
  };


  constructor() { }

  ngOnInit() {
  }

}
