import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoliciesComponent } from './policies/policies.component';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/home'},
  { path: 'home', component:HomeComponent},
  { path: 'policies', component:PoliciesComponent},
  { path: 'policies/new', component:PolicyComponent, data:{ action: 'add' } },
  { path: 'policies/:id', component:PolicyComponent, data:{ action: 'update' } },
  { path: '**', pathMatch:'full', redirectTo: '/home' } //catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
