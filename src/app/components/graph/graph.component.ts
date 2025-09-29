import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {
  @Input() lineChartData: ChartConfiguration['data'];
  @Input() lineChartType: ChartType = 'line';
  @Input() lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };
  @Input() lineChartLegend: boolean = true;


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
