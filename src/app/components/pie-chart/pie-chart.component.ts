import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() colors: string[] = [];
  @Input() data: any[] = [];

  // Pie chart options
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top',
        display: false
      },
    },
  };

  // Pie chart labels
  public pieChartLabels: string[] = this.colors;

  // Pie chart data
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
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
    this.pieChartData.datasets[0].data = this.data;
    this.pieChartData.datasets[0].backgroundColor = this.colors;
    this.pieChartData.datasets[0].hoverBackgroundColor = this.colors.map(item => `${item}7e`);
  }

  // Pie chart type
  public pieChartType: ChartType = 'pie';
}
