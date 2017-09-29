import {Routes} from '@angular/router';
import {ChefComponent} from './components/chef/chef.component';
import {DishComponent} from './components/dish/dish.component';
import {ClientComponent} from './components/client/client.component';
import {ChefDetailsComponent} from './components/chef/chef-details.component';
import {DishDetailsComponent} from './components/dish/dish-details.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth.guard';
import {ForgotpassComponent} from './components/forgotpass/forgotpass.component';
import {EnterEmailComponent} from './components/forgotpass/enter-email.component';
import {ClientDetailsComponent} from './components/client/client-datails.component';
import {GenreqComponent} from './components/genreq/genreq.component';
import {GenReqDetailsComponent} from './components/genreq/gen-req-details.component';

export const ROUTES: Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpass', component: EnterEmailComponent},
  {path: 'newpass', component: ForgotpassComponent},
  {path: 'chefs', component: ChefComponent, canActivate: [AuthGuard]},
  {path: 'chefs/:id', component: ChefDetailsComponent, canActivate: [AuthGuard]},
  {path: 'clients', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'clients/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'chefs/:id/dishes', component: DishComponent, canActivate: [AuthGuard]},
  {path: 'dishes/:id', component: DishDetailsComponent, canActivate: [AuthGuard]},
  {path: 'genreqs', component: GenreqComponent, canActivate: [AuthGuard]},
  {path: 'genreqs/:id', component: GenReqDetailsComponent, canActivate: [AuthGuard]},
  {path: '**',  redirectTo: 'login'}
];
