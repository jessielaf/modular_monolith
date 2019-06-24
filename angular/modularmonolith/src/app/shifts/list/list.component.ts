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
