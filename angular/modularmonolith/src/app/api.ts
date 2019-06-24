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
