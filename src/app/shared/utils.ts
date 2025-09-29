import { GraphData } from "../models/graph-models";
import { Log } from "../models/log.interface";

export class Utils {

  public static countErrorsByDay(obj: Log[]): GraphData[] {
    const occurrences = new Map<string, number>();

    obj.forEach(log => {
      const dayStr = this.formatTimestampToDate(log.timestamp);
      occurrences.set(dayStr, (occurrences.get(dayStr) || 0) + 1);
    });

    return this.sortDateInterval(Array.from(occurrences, ([day, value]) => ({ day, value })));
  }

  public static averageResponseTimeByDay(obj: Log[]): GraphData[] {
    const occurrences = new Map<string, { count: number, sumResponseTime: number }>();

    obj.forEach(log => {
      const dayStr = this.formatTimestampToDate(log.timestamp);
      const responseTime = log.responseTime;
      occurrences.set(dayStr, { count: (occurrences.get(dayStr)?.count || 0) + 1, sumResponseTime: (occurrences.get(dayStr)?.sumResponseTime || 0) + responseTime });
    });

    return this.sortDateInterval(Array.from(occurrences, ([day, { count, sumResponseTime }]) => ({
      day: day,
      value: sumResponseTime / count
    })));
  }

  private static transformTimestampToDate(timestamp: number): Date {
    const date = new Date(timestamp * 1000);
    return date;
  }

  private static transformDateToString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private static formatTimestampToDate(timestamp: number): string {
    const date = this.transformTimestampToDate(timestamp);
    return this.transformDateToString(date);
  }

  private static sortDateInterval(resultArray: GraphData[]): GraphData[] {
    resultArray.sort((a, b) => {
      const dateA = this.transformStringToDate(a.day);
      const dateB = this.transformStringToDate(b.day);

      return dateA.getTime() - dateB.getTime();
    });
    return resultArray;
  }

  public static transformStringToDate(stringDate: string): Date {
    const [day, month, year] = stringDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date;
  }
}