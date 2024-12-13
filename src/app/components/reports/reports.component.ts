import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  ngOnInit(): void {

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
        labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
        datasets: [
          {
            label: 'Total Sent',
            data: [8, 12, 10, 14, 9, 14, 10],
            borderColor: '#FF515C',
            pointBorderColor: '#FF515C',
            pointBackgroundColor: '#FF515C',
            tension: .4,
            borderWidth: 7,
            pointBorderWidth: 0,
          },
          {
            label: 'Whatsapp',
            data: [8 - 2, 12 + 2, 10 - 2, 14 - 4, 9 - 2, 14 + 2, 10 - 2],
            borderColor: '#2EBC96',
            pointBorderColor: '#2EBC96',
            pointBackgroundColor: '#2EBC96',
            tension: .4,
            borderWidth: 7,
            pointBorderWidth: 0,
          },
          {
            label: 'SMS',
            data: [8 + 2, 12 - 2, 10 + 2, 14 - 4, 9 + 2, 14 - 2, 10 + 2],
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
