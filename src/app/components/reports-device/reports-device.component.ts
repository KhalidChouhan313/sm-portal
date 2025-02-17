import { Component, OnInit, Input,  SimpleChanges, } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reports-device',
  templateUrl: './reports-device.component.html',
  styleUrls: ['./reports-device.component.css']
})
export class ReportsDeviceComponent {

  @Input() trackDriverTotalMsg: number 
  @Input() graphData: any
  ngOnChanges(changes: SimpleChanges): void {
    console.log("data", this.graphData)
    console.log( "data",this.graphData[0].data)
    Chart.register(...registerables);

    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    // Check if there is an existing chart and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon" ],
        datasets: [
          {
            label: this.graphData[0].label,
            data: this.graphData[0].data,
            borderColor: '#FF515C',
            pointBorderColor: '#FF515C',
            pointBackgroundColor: '#FF515C',
            tension: .4,
            borderWidth: 7,
            pointBorderWidth: 0,
          },
          {
            label: this.graphData[1].label,
            data: this.graphData[1].data,
            borderColor: '#2EBC96',
            pointBorderColor: '#2EBC96',
            pointBackgroundColor: '#2EBC96',
            tension: .4,
            borderWidth: 7,
            pointBorderWidth: 0,
          },
          {
            label: this.graphData[2].label,
            data: this.graphData[2].data,
            borderColor: '#3B82F6',
            pointBorderColor: '#3B82F6',
            pointBackgroundColor: '#3B82F6',
            tension: .4,
            borderWidth: 7,
            pointBorderWidth: 0,
          },
          {
            label: this.graphData[3].label,
            data: this.graphData[3].data,
            borderColor: '#3B82F6',
            pointBorderColor: '#3B82F6',
            pointBackgroundColor: '#3B82F6',
            tension: .4,
            borderWidth: 7,
            pointBorderWidth: 0,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            grid: {
              display: false,  // Remove grid lines for the x-axis
              lineWidth: 0
            }
          },
          y: {
            display: false,
            grid: {
              display: false,  // Remove grid lines for the y-axis
            }
          }
        },
        plugins: {
          legend: {
            display: false
            // position: 'top',
            // align: "center",
            // labels: {
            //   boxHeight: 20,
            //   boxWidth: 20,
            //   textAlign: "center",
            //   boxPadding: 430,
            //   usePointStyle: true,
            //   pointStyle: "circle",
            //   padding: 20,
            // },
          },
        },
      }
    });
  }
}
