import { Component } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {

  // Doughnut chart options
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Doughnut chart labels
  public doughnutChartLabels: string[] = ['Red', 'Blue', 'Yellow'];

  // Doughnut chart data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: ['#FF5733', '#33B5FF', '#FFEB3B'],
        hoverBackgroundColor: ['#FF4C00', '#2980B9', '#F4D03F'],
      },
    ],
  };

  // Doughnut chart type
  public doughnutChartType: ChartType = 'doughnut';

}