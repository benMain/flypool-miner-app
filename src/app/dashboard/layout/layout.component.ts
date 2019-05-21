import { Component, OnInit } from '@angular/core';
import { FlypoolClientService } from '../../services';
import { Settings, History, Payout, CurrentStatistics } from '../../models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  private settings: Settings;
  private payouts: Payout[];
  private history: History[];
  private currentStatistics: CurrentStatistics;
  constructor(private readonly flypoolClient: FlypoolClientService) {
    this.flypoolClient.getSettings().subscribe((x) => (this.settings = x));
    this.flypoolClient.getPayouts().subscribe((x) => (this.payouts = x));
    this.flypoolClient.getHistory().subscribe((x) => (this.history = x));
    this.flypoolClient.getCurrentStatistics().subscribe((x) => (this.currentStatistics = x));
  }

  ngOnInit() {
    this.flypoolClient.refresh();
  }

}
