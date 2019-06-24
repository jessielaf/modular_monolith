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
