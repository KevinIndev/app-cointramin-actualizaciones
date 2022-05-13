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
    EconomicActivityComponent
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
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
