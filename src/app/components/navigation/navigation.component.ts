
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

declare var jQuery: any;

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.template.html',
  styles: [
    `
    li.active {
    border-left: 5px solid;
    border-color: rgb(240, 173, 78);
    background: rgba(0, 0, 0, 0.26);
    }
    `
  ]
})

export class NavigationComponent {
  userInfo;
  constructor(private router: Router,
  ) {
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
}

export default NavigationComponent;
