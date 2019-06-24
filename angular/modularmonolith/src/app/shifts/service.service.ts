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
