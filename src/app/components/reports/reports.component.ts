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
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: 'Total Sent',
            data: [10, 30, 25, 34, 43, 54, 23, 64, 43, 10],
            borderColor: 'rgba(12, 231, 250, 0.50)',
            // backgroundColor: 'rgba(12, 231, 250, 0.30)',
            // fill: true,
          },
          {
            label: 'Total Sent By Whatsapp',
            data: [10, 30, 25, 34, 43, 54, 23, 64, 43, 55].sort((a, b) => a - b),
            borderColor: 'rgba(250, 145, 107, 0.50)',
            // backgroundColor: '#FA916B8e',
            // fill: true,
          },
          {
            label: 'Total Sent By SMS',
            data: [45, 56, 34, 23, 43, 65, 32, 12, 15, 66],
            borderColor: '#4669FA',
            // backgroundColor: '#4669FA66',
            // fill: true,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: "end",
            labels: {
              boxHeight: 9,
              boxWidth: 9,
              textAlign: "center",
              boxPadding: 430,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 20
            },
          },
        },
      }
    });
  }
}