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
