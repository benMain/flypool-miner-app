import { Component, OnInit, ViewChild } from '@angular/core';
import { FlypoolClientService } from '../../services';
import { History } from '../../models';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-history-tracker',
  templateUrl: './history-tracker.component.html',
  styleUrls: ['./history-tracker.component.css']
})
export class HistoryTrackerComponent implements OnInit {
  constructor(private readonly flypoolClient: FlypoolClientService) {
    this.flypoolClient.getHistory().subscribe((x) => this.updateChart(x));
  }

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    }
  };

  ngOnInit() {
  }

  private updateChart(history: History[]) {
    this.lineChartData = this.computeChartData(history);
    this.lineChartLabels = this.computeChartLabels(history);
  }

  private computeChartData(history: History[]): ChartDataSets[] {
    return [
      { data: history.map(x => x.averageHashrate), label: 'Average Hash Rate' },
      { data: history.map(x => x.currentHashrate), label: 'Instant Hash Rate' },
    ];
  }

  private computeChartLabels(history: History[]): Label[] {
    return history
      .map(x => new Date(x.time * 1000))
      .map(x => x.toLocaleTimeString());
  }

}
