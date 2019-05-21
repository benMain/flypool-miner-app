import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BrowserStorageService } from './browser-storage.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static paymentAddressKey = 'paymentAddress';
  private currentUser: BehaviorSubject<User>;
  private currentUserObservable: Observable<User>;

  constructor(
    private readonly storageService: BrowserStorageService) {
    this.currentUser = new BehaviorSubject<User>(null);
    const paymentAddress = this.storageService.get(AuthenticationService.paymentAddressKey);
    if (paymentAddress) {
      this.currentUser = new BehaviorSubject<User>({ paymentAddress });
    }
    this.currentUserObservable = this.currentUser.asObservable();
  }

  public getUser(): User {
    return this.currentUser.value;
  }

  public getUserObservable(): Observable<User> {
    return this.currentUserObservable;
  }

  public login(paymentAddress: string): void {
    this.storageService.set(AuthenticationService.paymentAddressKey, paymentAddress);
    this.currentUser.next({ paymentAddress });
  }

  public logout(): void {
    this.storageService.remove(AuthenticationService.paymentAddressKey);
    this.currentUser.next(null);
  }

}
