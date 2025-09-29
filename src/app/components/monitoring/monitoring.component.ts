import { Component } from '@angular/core';
import { LogDataService } from '../../services/log-data.service';
import { Log } from '../../models/log.interface';
import { ChartConfiguration } from 'chart.js';
import { GraphData, GraphType } from '../../models/graph-models';
import { GraphComponent } from '../graph/graph.component';
import { Utils } from '../../shared/utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-monitoring',
  imports: [GraphComponent, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonToggleModule],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent extends BaseComponent {


  private errorsOverTimeData: Log[];
  private errorsOverTimeChart: GraphData[];

  private responseTimeChart: GraphData[];

  lineChartData: ChartConfiguration['data'];

  daysInterval: Date[];

  
  currentGraph: GraphType = GraphType.Errors;
  graphType = GraphType;

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(logDataService: LogDataService) {
    super(logDataService);
  }

  selectGraph() {
    this.processingData();
  }

  processingData() {
    switch (this.currentGraph) {
      case GraphType.Errors:
        this.processingErrorOverTimeData();
        break;
      case GraphType.ResponseTime:
        this.processingResponseTimeData();
        break;
    }
  }

  dateRangeChange() {
    if (this.range.value.end && this.range.value.start) {
      this.processingData();
    }
  }

  processingErrorOverTimeData() {
    this.errorsOverTimeData = this.logData.filter(log => log.statusCode !== 200);
    this.errorsOverTimeChart = Utils.countErrorsByDay(this.errorsOverTimeData);
    this.buildChart(this.errorsOverTimeChart);
  }

  processingResponseTimeData() {
    this.responseTimeChart = Utils.averageResponseTimeByDay(this.logData);
    this.buildChart(this.responseTimeChart);
  }

  filterRangeData(dataArrayChart: GraphData[]): GraphData[] {
    if (this.range.value.end && this.range.value.start) {
      let startDate = new Date(this.range.value.start);
      let endDate = new Date(this.range.value.end);

      dataArrayChart = dataArrayChart.filter((data) =>
       Utils.transformStringToDate(data.day) >= startDate && Utils.transformStringToDate(data.day) <= endDate
      )
    } 
    return dataArrayChart
  }

  buildChart(dataArrayChart: GraphData[]) {
    dataArrayChart = this.filterRangeData(dataArrayChart);
    this.lineChartData = {
      datasets: [{
        data: dataArrayChart.map(point => point.value),
        label: this.currentGraph === GraphType.Errors ? 'Error over time':'Average response time',
        fill: 'origin',
      }],
      labels: dataArrayChart.map(point => point.day)
    }
  }
}

