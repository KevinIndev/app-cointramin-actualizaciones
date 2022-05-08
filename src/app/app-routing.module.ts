import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssociateComponent } from './components/associate/list-associate/list-associate.component';
import { LoginComponent } from './components/user/login/login.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'master', component: MasterComponent, children: [
    {path:'', component:ListAssociateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
