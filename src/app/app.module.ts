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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { MasterComponent } from './master/master.component';
import { NavSideComponent } from './navs/nav-side/nav-side.component';
import { NavBarComponent } from './navs/nav-bar/nav-bar.component';
import { ListAssociateComponent } from './components/associate/list-associate/list-associate.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    NavSideComponent,
    NavBarComponent,
    ListAssociateComponent
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
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
