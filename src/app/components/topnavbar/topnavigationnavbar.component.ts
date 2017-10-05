import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { smoothlyMenu } from '../../../../../../../bizzclick/Angular_4_Seed_Project/src/app/app.helpers';
declare var jQuery:any;

@Component({
  selector: 'topnavigationnavbar',
  templateUrl: 'src/app/components/topnavbar/topnavigationnavbar.template.html'
})
export class TopNavigationNavbarComponent {

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

}
