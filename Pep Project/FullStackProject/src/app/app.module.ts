import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewallComponent } from './viewall/viewall.component';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { InsertComponent } from './insert/insert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ViewallComponent,
    SearchComponent,
    UpdateComponent,
    DeleteComponent,
    InsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
