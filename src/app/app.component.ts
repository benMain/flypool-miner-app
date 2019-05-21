import { Component } from '@angular/core';
import { User } from './models';
import { Router } from '@angular/router';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flypool Miner Application';
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
    this.authService.getUserObservable().subscribe((x) => (this.currentUser = x));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
