import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnChanges {
  @Input() graphData: any;
  @Input() totalMsg: any;
  activeIndex: number = 0; // Default to "Total"
  buttons = ['Total', 'WhatsApp', 'SMS'];
  chart: any; // Store chart instance

  constructor() {
    Chart.register(...registerables); // Ensure Chart.js is registered
  }

  ngOnInit(): void {
    // Initialize the chart only when data is available
    if (this.graphData && this.graphData.length > 0) {
      setTimeout(() => this.updateChart(), 200);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] && changes['graphData'].currentValue) {
      this.activeIndex = 0; // Default to "Total"
      setTimeout(() => this.updateChart(), 200); // Delay to ensure data is ready
    }
  }

  updateChart(): void {
    if (!this.graphData || this.graphData.length === 0) return; // Prevent rendering with no data

    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!canvas) return; // Ensure canvas exists

    // Destroy previous chart instance before creating a new one
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    // Generate last 7 days dynamically
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i)); // Get last 7 days (today at the end)
      return date.toLocaleDateString('en-US', { weekday: 'short' }); // Format as "Wed", "Thu", etc.
    });

    let datasets = [];

    if (this.activeIndex === 0) {
      datasets = [
        {
          label: 'Total',
          data: this.graphData[3]?.data || [],
          borderColor: '#3981F7',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 5,
          pointRadius: 0, // Remove dots
          pointHoverRadius: 0, // Remove dots on hover
        },
        {
          label: 'WhatsApp',
          data: this.graphData[1]?.data || [],
          borderColor: '#2EBC96',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 5,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: 'SMS',
          data: this.graphData[0]?.data || [],
          borderColor: '#FF515C',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 5,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ];
    } else {
      const selectedData =
        this.activeIndex === 2
          ? this.graphData[0] // SMS
          : this.activeIndex === 1
          ? this.graphData[1] // WhatsApp
          : this.graphData[3]; // Total (default)

      let selectedColor =
        this.activeIndex === 1
          ? '#2EBC96'
          : this.activeIndex === 2
          ? '#FF515C'
          : '#3981F7';

      datasets = [
        {
          label: selectedData.label,
          data: selectedData.data || [],
          borderColor: selectedColor,
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 7,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ];
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: last7Days, // Updated dynamic labels
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { display: true, grid: { display: false } },
          y: { display: false, grid: { display: false } },
        },
        plugins: { legend: { display: false } },
      },
    });
  }

  setActive(index: number): void {
    this.activeIndex = index;
    this.updateChart(); // Update chart when button is clicked
  }
}
