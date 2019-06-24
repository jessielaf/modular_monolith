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
