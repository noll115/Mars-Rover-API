import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { HttpClientModule } from "@angular/common/http";
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { FormsModule } from "@angular/forms";
import { PhotoGridComponent } from './components/photo-grid/photo-grid.component';
import { NASAService } from "./services/nasa.service";

@NgModule({
  declarations: [
    AppComponent,
    DropDownMenuComponent,
    PhotoCardComponent,
    NumberInputComponent,
    PhotoGridComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [NASAService],
  bootstrap: [AppComponent]
})
export class AppModule { }
