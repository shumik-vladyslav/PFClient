import { Component } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    this.smoothlyMenu();
  }
  smoothlyMenu() {
    if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
      // Hide menu in order to smoothly turn on when maximize menu
      jQuery('#side-menu').hide();
      // For smoothly turn on menu
      setTimeout(
        function () {
          jQuery('#side-menu').fadeIn(400);
        }, 200);
    } else if (jQuery('body').hasClass('fixed-sidebar')) {
      jQuery('#side-menu').hide();
      setTimeout(
        function () {
          jQuery('#side-menu').fadeIn(400);
        }, 100);
    } else {
      // Remove all inline style from jquery fadeIn function to reset menu state
      jQuery('#side-menu').removeAttr('style');
    }
  }
}
