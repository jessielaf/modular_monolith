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
