import { Component, OnInit } from '@angular/core';
import { FlypoolClientService } from '../../services';
import { CurrentStatistics } from 'src/app/models';

@Component({
  selector: 'app-current-statistics',
  templateUrl: './current-statistics.component.html',
  styleUrls: ['./current-statistics.component.css']
})
export class CurrentStatisticsComponent implements OnInit {

  public loaded = false;
  public statistics: CurrentStatistics;
  constructor(private readonly flypoolClient: FlypoolClientService) {
    this.flypoolClient.getCurrentStatistics().subscribe((x) => this.updateTable(x));
  }

  ngOnInit() {
  }

  public updateTable(currentStats: CurrentStatistics): void {
    this.statistics = currentStats;
    this.loaded = true;
  }

  public getDateString(propName: string): string {
    if (!this.statistics) {
      return 'unknown';
    }
    return new Date(this.statistics[propName] * 1000).toLocaleString();
  }

}
