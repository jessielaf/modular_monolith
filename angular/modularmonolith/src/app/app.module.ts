import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListComponent } from "./employees/list/list.component";
import EmployeeApi from "./employees/api";

@NgModule({
  declarations: [AppComponent, ListComponent].concat(
    EmployeeApi.exportedComponents()
  ),
  imports: [BrowserModule, AppRoutingModule].concat(
    EmployeeApi.exportedRoutes()
  ),
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
