import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {config} from '../../app.config';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;

  message;
  error;

  constructor(
    private http: Http,
    private router: Router) { }

  ngOnInit() {
    setTimeout(() => $('#wrapper').removeClass('toggled'), 500);
    $('#wrapper').removeClass('toggled');
  }

  login() {
    console.log(this.email, this.password);
    this.http.post(`${config.api_prefix}auth/`, { email: this.email, pass: this.password }).subscribe(
      resp => {
        console.log(resp.json());
        if (resp.json().error) {
          this.error = true;
          this.message = resp.json().error;
        } else if (resp.json().token) {
          localStorage.setItem('jwtoken', resp.json().token);
          $('#wrapper').addClass('toggled');
          this.router.navigate(['/chefs']);
        }
      }
    );
  }
}
