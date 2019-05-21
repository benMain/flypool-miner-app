import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User, CurrentStatistics, FlypoolGenericResponse, FlypoolGenericArrayResponse, History, Payout, Settings } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class FlypoolClientService {

  private baseUrl = 'https://api-zcash.flypool.org';
  private user: User;
  private currentStatistics: BehaviorSubject<CurrentStatistics>;
  private history: BehaviorSubject<History[]>;
  private payouts: BehaviorSubject<Payout[]>;
  private settings: BehaviorSubject<Settings>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthenticationService) {
    this.authService.getUserObservable().subscribe((x) => (this.user = x));
    this.currentStatistics = new BehaviorSubject<CurrentStatistics>(null);
    this.history = new BehaviorSubject<History[]>([]);
    this.payouts = new BehaviorSubject<Payout[]>([]);
    this.settings = new BehaviorSubject<Settings>(null);
  }

  public getHistory(): Observable<History[]> {
    return this.history.asObservable();
  }

  public getCurrentStatistics(): Observable<CurrentStatistics> {
    return this.currentStatistics.asObservable();
  }

  public getPayouts(): Observable<Payout[]> {
    return this.payouts.asObservable();
  }

  public getSettings(): Observable<Settings> {
    return this.settings.asObservable();
  }

  public async refresh(): Promise<boolean> {
    try {
      const promises: Promise<void>[] = [];
      promises.push(this.fetchCurrentStatistics());
      promises.push(this.fetchHistory());
      promises.push(this.fetchPayouts());
      promises.push(this.fetchSettings());
      await Promise.all(promises);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  private async fetchCurrentStatistics(): Promise<void> {
    const url = this.computeUrl('currentStats');
    const response = await this.httpClient.get<FlypoolGenericResponse<CurrentStatistics>>(url).toPromise();
    this.currentStatistics.next(response.data);
  }

  private async fetchHistory(): Promise<void> {
    const url = this.computeUrl('history');
    const response = await this.httpClient.get<FlypoolGenericArrayResponse<History>>(url).toPromise();
    this.history.next(response.data);
  }

  private async fetchPayouts(): Promise<void> {
    const url = this.computeUrl('payouts');
    const response = await this.httpClient.get<FlypoolGenericArrayResponse<Payout>>(url).toPromise();
    this.payouts.next(response.data);
  }

  private async fetchSettings(): Promise<void> {
    const url = this.computeUrl('settings');
    const response = await this.httpClient.get<FlypoolGenericResponse<Settings>>(url).toPromise();
    this.settings.next(response.data);
  }


  private computeUrl(endpoint: string): string {
    return `${this.baseUrl}/miner/${this.user.paymentAddress}/${endpoint}`;
  }


}
