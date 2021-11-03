import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes, ROUTES} from '@angular/router';
import {HomeComponent} from './containers/home/home.component';
import {NewApplicationComponent} from './containers/new-application/new-application.component';
import {ShowApplicationComponent} from "./containers/show-application/show-application.component";
import {LoginComponent} from "./containers/login/login.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'zupui/new', component: NewApplicationComponent, pathMatch: 'full'},
  {path: 'zupui/login/:userLogin', component: LoginComponent, pathMatch: 'full'},
  {path: 'zupui/:uuid', component: ShowApplicationComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollOffset: [0, 0]})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
