import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-total-ttv',
  templateUrl: './total-ttv.component.html',
  styleUrls: ['./total-ttv.component.css']
})
export class TotalTtvComponent implements OnInit {
  @Input() priceBaseStats: any;
  @Input() bookingData: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    console.log(this.priceBaseStats);

    // this.renderChart();
  }

  // renderChart(): void {
  //   const canvas = document.getElementById('ttvChart') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');
  //   // const ctx = document.getElementById('ttvChart') as HTMLCanvasElement;

  //   const gradient = ctx?.createLinearGradient(0, 0, 0, 150);
  //   gradient?.addColorStop(0, 'rgba(108, 99, 255, 0.4)'); // Light purple
  //   gradient?.addColorStop(1, 'rgba(192, 189, 248, 0)'); // Light purple
  //   // gradient?.addColorStop(1, 'rgb(255, 255, 255)');

  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
  //       datasets: [
  //         {
  //           label: 'TTV Trend',
  //           data: [12000, 15000, 14000, 16000, 15000, 17000, 16500],
  //           borderColor: '#6C63FF',
  //           borderWidth: 2,
  //           tension: .4,
  //           fill: true,
  //           backgroundColor: gradient,
  //         },
  //         {
  //           label: 'Projected Trend',
  //           data: [13000, 14000, 13500, 15500, 14500, 16000, 15500],
  //           borderColor: '#6C63FF',
  //           borderDash: [4, 2],
  //           borderWidth: 1,
  //           tension: .4,
  //           fill: false,
  //           pointStyle: false,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       // maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //       elements: {
  //         point: {
  //           radius: 0
  //         }
  //       },
  //       scales: {
  //         x: {
  //           display: true,
  //           border: {
  //             display: false
  //           },
  //           grid: {
  //             display: false,  // Remove grid lines for the x-axis
  //             lineWidth: 0
  //           }
  //         },
  //         y: {
  //           display: false,
  //           grid: {
  //             display: false,  // Remove grid lines for the x-axis
  //           }
  //         },
  //       },
  //     },
  //   });
  // }
}