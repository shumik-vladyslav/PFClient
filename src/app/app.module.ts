import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChefComponent } from './components/chef/chef.component';
import { DishComponent } from './components/dish/dish.component';
import { ClientComponent } from './components/client/client.component';
import { ChefDetailsComponent} from './components/chef/chef-details.component';
import { DishDetailsComponent} from './components/dish/dish-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard} from './auth.guard';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { EnterEmailComponent} from './components/forgotpass/enter-email.component';
import { ClientDetailsComponent} from './components/client/client-datails.component';
import { GenreqComponent } from './components/genreq/genreq.component';
import { GenReqDetailsComponent} from './components/genreq/gen-req-details.component';
import { NavigationComponent} from './components/navigation/navigation.component';

import {DataTableModule, SharedModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    ChefComponent,
    DishComponent,
    ClientComponent,
    ChefDetailsComponent,
    DishDetailsComponent,
    LoginComponent,
    ForgotpassComponent,
    EnterEmailComponent,
    ClientDetailsComponent,
    GenreqComponent,
    GenReqDetailsComponent,
    NavigationComponent
  ],
  imports: [
    SharedModule,
    DataTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
