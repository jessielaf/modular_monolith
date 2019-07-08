The versions used are:

-   Angular-cli 8.0.2

-   Node 10.15.3

-   npm 6.4.1

To install Angular run

      npm install -g @angular/cli

Now create a new angular project:

      ng new modularmonolith

On the questions answer yes and CSS.

Angular does not support underscore in the name so the project is named
modularmonolith instead of modular\_monolith

Angular does have its own HTTP Client but you have to include it by
adding `HttpClientModule` to the imports in `src/app/app.module.ts`

Create the proxy by writing the next to `proxy.config.json`

      {
        "/api": {
          "target": "http://localhost:8000",
          "pathRewrite": {
            "^/api": ""
          }
        }
      }

And add the proxy to `angluar.json`

      {
        ...
        "project": {
          "modularmonolith": {
            ...
            "architect": {
              ...
              "serve": {
                ...
                "options": {
                  ...
                  "proxyConfig": "proxy.conf.json"
                }
              }
            }
          }
        }
      }

Next up the api can be created. Angular works with typescript and
typescript does support abstract classes. But it does not support static
abstract function. Thus the implementation looks like this:

      import { Observable } from "rxjs";
      import { Injectable } from "@angular/core";

      @Injectable()
      abstract class Service {
        abstract create(object: any): Observable<any>;
        abstract retrieve(id: number): Observable<any>;
        abstract overview(): Observable<any>;
      }

      abstract class Api {
        static exportedModules(): any[] {
          throw new Error("exportedModules not implemented in your api");
        }

        static service(): any {
          throw new Error("service not implemented in your api");
        }
      }

      export { Api, Service };

First for the employees module create the service in
`src/app/employees/service.service.ts`

      import { Injectable } from "@angular/core";
      import { HttpClient } from "@angular/common/http";
      import { Observable } from "rxjs";
      import { Service } from "../api";

      const prefix = "/api/employees/";

      const urls = {
        default: prefix,
        id: (id: number) => `${prefix}${id}/`
      };

      @Injectable({
        providedIn: "root"
      })
      export class EmployeeService implements Service {
        constructor(private httpClient: HttpClient) {}

        create(object: Employee): Observable<any> {
          return this.httpClient.post(urls.default, object);
        }

        retrieve(id: number): Observable<any> {
          return this.httpClient.get(urls.id(id));
        }

        overview(): Observable<any> {
          return this.httpClient.get(urls.default);
        }
      }

Also because typescript is used in angular the models also have to be
defined. Just as with the backend languages:

`src/app/employees/models.ts`:

      interface Employee {
      id: number;
      name: string;
      email: string;
      birth_date: Date;
    }

Now the first view can be created:

      ng generate module --routing employees/create
      ng generate component employees/create

First add the `FormsModule` to
`src/app/employees/create/create.module.ts`:

      import { NgModule } from "@angular/core";
      import { CommonModule } from "@angular/common";
      import { FormsModule } from "@angular/forms";
      import { CreateRoutingModule } from "./create-routing.module";
      import { CreateComponent } from "./create.component";

      @NgModule({
        declarations: [CreateComponent],
        imports: [CommonModule, CreateRoutingModule, FormsModule]
      })
      export class CreateModule {}

We can than create the component in
`src/app/employees/create/create.component.ts`:

      import { Component } from "@angular/core";
      import { EmployeeService } from "../service.service";
      import { Router } from "@angular/router";

      @Component({
        selector: "app-create",
        templateUrl: "./create.component.html",
        styleUrls: ["./create.component.css"]
      })
      export class CreateComponent {
        employee: Employee = {} as Employee;

        constructor(
          private employeeService: EmployeeService,
          private router: Router
        ) {}

        submit() {
          this.employeeService.create(this.employee).subscribe(() => {
            this.router.navigate(["/employees"]);
          });
        }
      }

And the matching html in
`src/app/employees/create/create.component.html`:

      <form (submit)="submit()">
        <div>
          <label for="name">Name: </label>
          <input
            id="name"
            [(ngModel)]="employee.name"
            placeholder="Name"
            type="text"
            name="name"
          />
        </div>

        <div>
          <label for="birthDate">Birth date: </label>
          <input
            id="birthDate"
            [(ngModel)]="employee.birth_date"
            placeholder="01-04-1998"
            type="text"
            name="birthDate"
          />
        </div>

        <div>
          <label for="email">Email: </label>
          <input
            id="email"
            [(ngModel)]="employee.email"
            placeholder="jessie@example.com"
            type="email"
            name="email"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

And than we can create the routing for this module in
`src/app/employees/create/create-routing.module.ts`::

      import { NgModule } from "@angular/core";
      import { Routes, RouterModule } from "@angular/router";
      import { CreateComponent } from "./create.component";

      const routes: Routes = [
        { path: "employees/create", component: CreateComponent }
      ];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class CreateRoutingModule {}

This same process can be followed by most views:

      ng generate module --routing employees/list
      ng generate component employees/list

`src/app/employees/list/list.component.ts`:

      import { Component, OnInit } from "@angular/core";
      import EmployeeApi from "../api";
      import { EmployeeService } from "../service.service";

      @Component({
        selector: "app-list",
        templateUrl: "./list.component.html",
        styleUrls: ["./list.component.css"]
      })
      export class ListComponent implements OnInit {
        employees: Employee[];

        constructor(private employeeService: EmployeeService) {}

        ngOnInit() {
          this.employeeService.overview().subscribe(data => (this.employees = data));
        }
      }

`src/app/employees/list/list.component.html`:

      <ul>
        <li *ngFor="let employee of employees">
          <a [routerLink]="[employee.id]">{{ employee.name }}</a>
        </li>
      </ul>

      <a [routerLink]="['create']">Create employee</a>

`src/app/employees/list/list-routing.module.ts`::

      import { NgModule } from "@angular/core";
      import { Routes, RouterModule } from "@angular/router";
      import { ListComponent } from "./list.component";

      const routes: Routes = [{ path: "employees", component: ListComponent }];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class ListRoutingModule {}

      ng generate module --routing employees/detail
      ng generate component employees/detail

`src/app/employees/detail/detail.component.ts`:

      import { Component, OnInit } from "@angular/core";
      import { EmployeeService } from "../service.service";
      import { ActivatedRoute } from "@angular/router";

      @Component({
        selector: "app-detail",
        templateUrl: "./detail.component.html",
        styleUrls: ["./detail.component.css"]
      })
      export class DetailComponent implements OnInit {
        employee: Employee = {} as Employee;

        constructor(
          private service: EmployeeService,
          private route: ActivatedRoute
        ) {}

        ngOnInit() {
          this.service
            .retrieve((this.route.snapshot.paramMap.get("id") as unknown) as number)
            .subscribe((employee: Employee) => {
              this.employee = employee;
            });
        }
      }

`src/app/employees/detail/detail.component.html`:

      <div>
        {{ employee.name }}

        <div>
          Shifts:
          <ul>
            <li *ngFor="let shift of employee.shifts">
              {{ shift.title }}
            </li>
          </ul>
        </div>
      </div>

`src/app/employees/detail/detail-routing.module.ts`::

      import { NgModule } from "@angular/core";
      import { Routes, RouterModule } from "@angular/router";
      import { DetailComponent } from "./detail.component";

      const routes: Routes = [{ path: "employees/:id", component: DetailComponent }];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class DetailRoutingModule {}

Next up is the creation of the api in `src/app/employees/api.ts`:

      import { Api } from "../api";
      import { ListRoutingModule } from "./list/list-routing.module";
      import { EmployeeService } from "./service.service";
      import { CreateRoutingModule } from "./create/create-routing.module";
      import { CreateModule } from "./create/create.module";
      import { ListModule } from "./list/list.module";
      import { DetailRoutingModule } from "./detail/detail-routing.module";
      import { DetailModule } from "./detail/detail.module";

      class EmployeeApi implements Api {
        static exportedModules(): any[] {
          return [
            ListRoutingModule,
            ListModule,
            CreateRoutingModule,
            CreateModule,
            DetailRoutingModule,
            DetailModule
          ];
        }

        static service(): any {
          return EmployeeService;
        }
      }

      export default EmployeeApi;

The shift module is up next. Again these are mostly the same. First the
service is created:

`src/app/shifts/service.service.ts`:

      import { Injectable } from "@angular/core";
      import { HttpClient } from "@angular/common/http";
      import { Observable } from "rxjs";
      import { Service } from "../api";

      const prefix = "/api/shifts/";

      const urls = {
        default: prefix,
        id: (id: number) => `${prefix}${id}/`
      };

      @Injectable({
        providedIn: "root"
      })
      export class ShiftService implements Service {
        constructor(private httpClient: HttpClient) {}

        create(object: Shift): Observable<any> {
          return this.httpClient.post(urls.default, object);
        }

        retrieve(id: number): Observable<any> {
          return this.httpClient.get(urls.id(id));
        }

        overview(): Observable<any> {
          return this.httpClient.get(urls.default);
        }
      }

Next up is the shift model definition:

`src/app/shifts/model.ts`:

      interface Shift {
        id: number;
        title: string;
        start: Date;
        end: Date;
      }

      ng generate module --routing shifts/list
      ng generate component shifts/list

`src/app/shifts/list/list.component.ts`:

      import { Component, OnInit } from "@angular/core";
      import ShiftApi from "../api";
      import { ShiftService } from "../service.service";

      @Component({
        selector: "app-list",
        templateUrl: "./list.component.html",
        styleUrls: ["./list.component.css"]
      })
      export class ListComponent implements OnInit {
        shifts: Shift[];

        constructor(private shiftService: ShiftService) {}

        ngOnInit() {
          this.shiftService.overview().subscribe(data => (this.shifts = data));
        }
      }

`src/app/shifts/list/list.component.html`:

      <ul>
        <li *ngFor="let shift of shifts">
          <a [routerLink]="[shift.id]">{{ shift.title }}</a>
        </li>
      </ul>

      <a [routerLink]="['create']">Create shift</a>

`src/app/shifts/list/list-routing.module.ts`::

      import { NgModule } from "@angular/core";
      import { Routes, RouterModule } from "@angular/router";
      import { ListComponent } from "./list.component";

      const routes: Routes = [{ path: "shifts", component: ListComponent }];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class ListRoutingModule {}

      ng generate module --routing shifts/detail
      ng generate component shifts/detail

`src/app/shifts/detail/detail.component.ts`:

      import { Component, OnInit } from "@angular/core";
      import { ShiftService } from "../service.service";
      import { ActivatedRoute } from "@angular/router";

      @Component({
        selector: "app-detail",
        templateUrl: "./detail.component.html",
        styleUrls: ["./detail.component.css"]
      })
      export class DetailComponent implements OnInit {
        shift: Shift = {} as Shift;

        constructor(private service: ShiftService, private route: ActivatedRoute) {}

        ngOnInit() {
          this.service
            .retrieve((this.route.snapshot.paramMap.get("id") as unknown) as number)
            .subscribe((shift: Shift) => {
              this.shift = shift;
            });
        }
      }

`src/app/shifts/detail/detail.component.html`:

      <div>
        {{ shift.title }}

        <div>
          Employees:
          <ul *ngIf="shift.employees">
            <li *ngFor="let employee of shift.employees">
              {{ employee.name }}
            </li>
          </ul>
        </div>
      </div>

`src/app/shifts/detail/detail-routing.module.ts`::

      import { NgModule } from "@angular/core";
      import { Routes, RouterModule } from "@angular/router";
      import { DetailComponent } from "./detail.component";

      const routes: Routes = [{ path: "shifts/:id", component: DetailComponent }];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class DetailRoutingModule {}

      ng generate module --routing shifts/create
      ng generate component shifts/create

`src/app/shifts/list/create.module.ts`:

      import { NgModule } from "@angular/core";
      import { CommonModule } from "@angular/common";
      import { FormsModule } from "@angular/forms";
      import { CreateRoutingModule } from "./create-routing.module";
      import { CreateComponent } from "./create.component";
      import { Service } from "src/app/api";
      import EmployeeApi from "src/app/employees/api";

      @NgModule({
        declarations: [CreateComponent],
        imports: [CommonModule, CreateRoutingModule, FormsModule]
      })
      export class CreateModule {}

Not the create shift component is really interesting. Angular works with
dependency injection and this means that dynamic services works a bit
different. Thus there is a need to create a provider in which you can
override what is injected. So the create component will look like this:
`src/app/shifts/list/create.component.ts`:

      import { Component, OnInit } from "@angular/core";
      import { ShiftService } from "../service.service";
      import { Router } from "@angular/router";
      import { Service } from "src/app/api";
      import EmployeeApi from "src/app/employees/api";
      import { HttpClient } from "@angular/common/http";

      const employeeService = (http: HttpClient) => new (EmployeeApi.service())(http);

      @Component({
        selector: "app-create",
        templateUrl: "./create.component.html",
        styleUrls: ["./create.component.css"],
        providers: [
          { provide: Service, useFactory: employeeService, deps: [HttpClient] }
        ]
      })
      export class CreateComponent implements OnInit {
        shift: Shift = {} as Shift;
        employees: Employee[] = [];

        constructor(
          private shiftService: ShiftService,
          private employeeService: Service,
          private router: Router
        ) {}

        ngOnInit() {
          this.employeeService.overview().subscribe((employees: Employee[]) => {
            this.employees = employees;
          });
        }

        submit() {
          this.shiftService.create(this.shift).subscribe(() => {
            this.router.navigate(["/shifts"]);
          });
        }
      }

`src/app/shifts/list/create.component.html`:

      <form (submit)="submit()">
        <div>
          <label for="title">Title: </label>
          <input
            id="title"
            [(ngModel)]="shift.title"
            placeholder="title"
            type="text"
            name="title"
          />
        </div>

        <div>
          <label for="start">Start: </label>
          <input
            id="start"
            [(ngModel)]="shift.start"
            placeholder="24-06-2019"
            type="text"
            name="start"
          />
        </div>

        <div>
          <label for="end">End: </label>
          <input
            id="end"
            [(ngModel)]="shift.end"
            placeholder="24-06-2019"
            type="text"
            name="end"
          />
        </div>

        <div>
          <label for="employees">Employees: </label>
          <select
            id="employees"
            [(ngModel)]="shift.employees"
            name="employees"
            multiple
          >
            <option *ngFor="let employee of employees" [value]="employee.id">{{
              employee.name
            }}</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

`src/app/shifts/list/create-routing.module.ts`::

      import { NgModule } from "@angular/core";
      import { Routes, RouterModule } from "@angular/router";
      import { CreateComponent } from "./create.component";

      const routes: Routes = [
        { path: "shifts/create", component: CreateComponent }
      ];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class CreateRoutingModule {}

Last of all the employee module and shift module should be added to
`src/app/app.module.ts`:

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

Now angular can be run by running:

      npm start
