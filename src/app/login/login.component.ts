import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private readonly authService: AuthenticationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,

  ) {
    if (this.authService.getUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      paymentAddress: ['', Validators.required],
    });

  }
  // convenience getter for easy access to form fields
  public getForm(): {
    [key: string]: AbstractControl;
  } {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const form = this.getForm();
    this.authService.login(form.paymentAddress.value);
    this.loading = false;
    this.router.navigate(['/dashboard']);
  }

}
