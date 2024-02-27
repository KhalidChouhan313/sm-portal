import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-multi-series-chart',
  templateUrl: './multi-series-chart.component.html',
  styleUrls: ['./multi-series-chart.component.css']
})
export class MultiSeriesChartComponent implements OnInit {
  public lineChartData: any = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // Add more series as needed
  ];
  public lineChartLabels: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: any = [
    {
      borderColor: 'rgba(0, 123, 255, 0.7)',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
    },
    {
      borderColor: 'rgba(255, 193, 7, 0.7)',
      backgroundColor: 'rgba(255, 193, 7, 0.2)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void { }
}
