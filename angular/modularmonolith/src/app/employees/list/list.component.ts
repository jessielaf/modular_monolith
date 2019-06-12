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
