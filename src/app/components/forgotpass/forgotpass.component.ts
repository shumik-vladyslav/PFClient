import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { config } from '../../app.config';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  password;
  retpassword;
  message;
  key;
  error = true;

  constructor(private http: Http,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.key = params['key'];
    });
    setTimeout(() => $('#wrapper').removeClass('toggled'), 500);
    $('#wrapper').removeClass('toggled');
  }

  onChangePass() {
    console.log('on change password');

    if ( this.password !== this.retpassword) {
      this.message = 'Passwords not match';
    } else {
      this.http.post(`${config.api_prefix}auth/updpass`,
        { pass: this.password, retpass: this.retpassword, key: this.key }).subscribe(
        resp => {
          console.log(resp.json());
          if (resp.json().error) {
            this.error = true;
            this.message = resp.json().error;
          } else if (resp.json().result ) {
            this.error = false;
            this.message = resp.json().result;
            // this.router.navigate(['/login']);
          } else {
            this.message = 'Unkown error';
          }
        }
      );
    }
  }

}
