import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    if ( this.isLogin ){
      this.router.navigate(['/portfolio'])
    }
    this.form = this.formBuilder.group({
      mail: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.nullValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  get Mail() {
    return this.form.get('mail');
  }

  get Pass() {
    return this.form.get('password');
  }

  onLogin() {
    console.log("Comenzando login...")
    this.auth.login(this.Mail?.value, this.Pass?.value);
  }

  get isLogin() {
    return this.auth.isLogin;
  }
}
