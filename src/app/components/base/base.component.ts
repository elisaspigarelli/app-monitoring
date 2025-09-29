import { Log } from "../../models/log.interface";
import { LogDataService } from "../../services/log-data.service";

export abstract class BaseComponent {
  loading: boolean = true;
  protected logData: Log[];

  constructor(private logDataService: LogDataService) {
    this.getLogData();
  }


  protected getLogData(modelID?: number | string | null) {
    this.loading = true;
    setTimeout(() => {
      this.logDataService.getData().subscribe(
        result => {
          this.logData = result;
          if (modelID && modelID !== null && modelID !== 'None') {
            this.logData = this.logData.filter(p => p.model === modelID)
          }
          this.loading = false;
          this.processingData();
        }
      );
    }, 500);
  }

  abstract processingData(): void;
}
