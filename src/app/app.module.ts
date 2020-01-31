import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { HttpClientModule } from "@angular/common/http";
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    DropDownMenuComponent,
    PhotoCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
