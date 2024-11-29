import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() colors: string[] = []
  @Input() data: any[] = []

  // Doughnut chart options
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top',
        display: false
      },
    },
  };

  // Doughnut chart labels
  public doughnutChartLabels: string[] = this.colors;

  // Doughnut chart data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderWidth: 0,
      },
    ],
  };

  ngOnInit(): void {
    this.doughnutChartData.datasets[0].data = this.data
    this.doughnutChartData.datasets[0].backgroundColor = this.colors
    this.doughnutChartData.datasets[0].hoverBackgroundColor = this.colors.map(item => `${item}7e`),
      this.doughnutChartData.datasets[0].borderWidth = 2
  }

  // Doughnut chart type
  public doughnutChartType: ChartType = 'doughnut';

}