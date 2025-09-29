import { Component, ViewChild } from '@angular/core';
import { Log } from '../../models/log.interface';
import { LogDataService } from '../../services/log-data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-predictions',
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, DatePipe, MatProgressSpinnerModule],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss'
})
export class PredictionsComponent extends BaseComponent {

  filteredLogData = new MatTableDataSource<Log>();
  displayedColumns: string[] = ['timestamp', 'predictionId', 'modelId', 'status', 'responseTime'];

  modelIds: number[] = [];

  selectedModelId: number | string | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(logDataService: LogDataService) {
    super(logDataService);
  }

  processingData() {
    this.logData.sort((a, b) => a.timestamp - b.timestamp);
    if (!this.selectedModelId) {
      this.modelOptions();
    }
    this.prepareTableData();
  }

  modelOptions() {
    this.modelIds = [...new Set(this.logData.map(p => p.model))];
    this.modelIds.sort();
  }

  prepareTableData() {
    this.filteredLogData = new MatTableDataSource<Log>(this.logData);
    this.filteredLogData.paginator = this.paginator;
  }

  filertData() {
    this.getLogData(this.selectedModelId);
  }
}

