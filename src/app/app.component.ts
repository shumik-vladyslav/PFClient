import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // $('#wrapper').toggleClass('toggled')
    setTimeout(() => $('#wrapper').addClass('toggled'), 500);
    $('#wrapper').addClass('toggled');

    $('#menu-toggle').click((e) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

}
