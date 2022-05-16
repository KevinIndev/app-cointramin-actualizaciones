import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {HttpClientModule} from'@angular/common/http';
import {FormsModule} from '@angular/forms';

//MODULES PRIMENG
import {AvatarModule} from 'primeng/avatar';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {ChipModule} from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {TabMenuModule} from 'primeng/tabmenu';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { MasterComponent } from './master/master.component';
import { NavSideComponent } from './navs/nav-side/nav-side.component';
import { NavBarComponent } from './navs/nav-bar/nav-bar.component';
import { ListAssociateComponent } from './components/associate/list-associate/list-associate.component';
import { DetailsAssociateComponent } from './components/associate/details-associate/details-associate.component';
import { PersonalInformationsComponent } from './components/associate/informations/personal-informations/personal-informations.component';
import { LocationInformationsComponent } from './components/associate/informations/location-informations/location-informations.component';
import { EconomicActivityComponent } from './components/associate/informations/economic-activity/economic-activity.component';
import { JobInformationsComponent } from './components/associate/informations/job-informations/job-informations.component';
import { ConyugeInformationsComponent } from './components/associate/informations/conyuge-informations/conyuge-informations.component';
import { ReferencesInformationsComponent } from './components/associate/informations/references-informations/references-informations.component';
import { DependentsInformationsComponent } from './components/associate/informations/dependents-informations/dependents-informations.component';
import { FinancialInformationsComponent } from './components/associate/informations/financial-informations/financial-informations.component';
import { IncomesInformationsComponent } from './components/associate/informations/financial-informations/incomes-informations/incomes-informations.component';
import { ExpensesInformationsComponent } from './components/associate/informations/financial-informations/expenses-informations/expenses-informations.component';
import { AssetsInformationComponent } from './components/associate/informations/financial-informations/assets-information/assets-information.component';
import { PassivesInformationsComponent } from './components/associate/informations/financial-informations/passives-informations/passives-informations.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    NavSideComponent,
    NavBarComponent,
    ListAssociateComponent,
    DetailsAssociateComponent,
    PersonalInformationsComponent,
    LocationInformationsComponent,
    JobInformationsComponent,
    EconomicActivityComponent,
    ConyugeInformationsComponent,
    ReferencesInformationsComponent,
    DependentsInformationsComponent,
    FinancialInformationsComponent,
    IncomesInformationsComponent,
    ExpensesInformationsComponent,
    AssetsInformationComponent,
    PassivesInformationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //modulos primeng
    AvatarModule,
    TableModule,
    ButtonModule,
    ChipModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    DropdownModule,
    ToastModule,
    TabMenuModule,
    ConfirmPopupModule,
    InputNumberModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
