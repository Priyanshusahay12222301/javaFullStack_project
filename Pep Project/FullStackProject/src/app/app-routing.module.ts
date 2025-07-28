import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewallComponent } from './viewall/viewall.component';
import { InsertComponent } from './insert/insert.component';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {path:"all",component:ViewallComponent},
  {path:"search",component:SearchComponent},
  {path:"insert",component:InsertComponent},
  {path:"update",component:UpdateComponent},
  {path:"delete",component:DeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
