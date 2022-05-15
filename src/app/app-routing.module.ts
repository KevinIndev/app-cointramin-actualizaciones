import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsAssociateComponent } from './components/associate/details-associate/details-associate.component';
import { ConyugeInformationsComponent } from './components/associate/informations/conyuge-informations/conyuge-informations.component';
import { EconomicActivityComponent } from './components/associate/informations/economic-activity/economic-activity.component';
import { JobInformationsComponent } from './components/associate/informations/job-informations/job-informations.component';
import { LocationInformationsComponent } from './components/associate/informations/location-informations/location-informations.component';
import { PersonalInformationsComponent } from './components/associate/informations/personal-informations/personal-informations.component';
import { ListAssociateComponent } from './components/associate/list-associate/list-associate.component';
import { LoginComponent } from './components/user/login/login.component';
import { SessionGuard } from './guards/session.guard';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'master', component: MasterComponent, canActivate:[SessionGuard], children: [
    {path:'', component:ListAssociateComponent},
    {path:'associate/details/:id', component:DetailsAssociateComponent,children:[
      {path:'personal-informations', component:PersonalInformationsComponent},
      {path:'location-informations', component:LocationInformationsComponent},
      {path:'economic-activity', component:EconomicActivityComponent},
      {path:'job-informations', component:JobInformationsComponent},
      {path: 'conyuge-informations', component:ConyugeInformationsComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
