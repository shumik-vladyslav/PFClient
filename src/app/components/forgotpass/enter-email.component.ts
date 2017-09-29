import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {config} from '../../app.config';
import {Http} from '@angular/http';

declare var $: any;

@Component({
  selector: 'app-enter-email',
  template: `
    <div class="container">
      <div class="card card-container">
        <img id="profile-img" class="profile-img-card" src="assets/logo.jpg" />
        <p id="profile-name" class="profile-name-card"></p>
        <form class="form-signin">
          <div class="alert alert-success" *ngIf="message" [class.alert-success]="!error" [class.alert-danger]="error">
            {{message}}
          </div>
          <input name="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" 
                 required autofocus [(ngModel)]="email">
          <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" (click)="sendEmail()">Send</button>
        </form><!-- /form -->
        <a routerLink="/login" class="forgot-password">
          Go to login
        </a>
      </div><!-- /card-container -->
    </div><!-- /container -->
  `,
  styleUrls: ['./forgotpass.component.css']
})

export class EnterEmailComponent implements OnInit {
  email;
  message;
  error= true;
  constructor(private http: Http,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    setTimeout(() => $('#wrapper').removeClass('toggled'), 500);
    $('#wrapper').removeClass('toggled');
  }

  sendEmail() {
    console.log('sendEmail');
    this.http.get(`${config.api_prefix}auth/fgpassemail?email=${this.email}`).map(res => res.json()).subscribe(
      obj => {
        console.log(obj);
        if (obj.error) {
          this.error = true;
          this.message = obj.error;
        } else if (obj.result ) {
          this.error = false;
          this.message = obj.result;
        } else {
          this.message = 'Unkown error';
        }
      }
    );
  }
}
