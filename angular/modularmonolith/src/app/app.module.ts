import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import EmployeeApi from "./employees/api";
import { HttpClientModule } from "@angular/common/http";
import ShiftApi from "./shifts/api";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule].concat(
    EmployeeApi.exportedModules(),
    ShiftApi.exportedModules()
  ),
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
