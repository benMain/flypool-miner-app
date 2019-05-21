import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HistoryTrackerComponent } from './history-tracker/history-tracker.component';
import { ChartsModule } from 'ng2-charts';
import { CurrentStatisticsComponent } from './current-statistics/current-statistics.component';

@NgModule({
  declarations: [LayoutComponent, HistoryTrackerComponent, CurrentStatisticsComponent],
  imports: [
    CommonModule,
    ChartsModule,
  ]
})
export class DashboardModule { }
