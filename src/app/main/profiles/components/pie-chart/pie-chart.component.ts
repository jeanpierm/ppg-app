import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() pieChartData?: ChartData<'pie', number[], string | string[]>;
  @Input() title!: string;
  @Input() loading!: boolean;

  // Pie
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  pieChartType: ChartType = 'pie';
  pieChartPlugins = [DatalabelsPlugin];

  // events
  chartClicked({ event, active }: { event: ChartEvent; active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent; active: {}[] }): void {
    console.log(event, active);
  }
}
