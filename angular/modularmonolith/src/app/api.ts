import { Observable } from "rxjs";

interface Service {
  create(object: any): Observable<any>;
  retrieve(id: number): Observable<any>;
  overview(): Observable<any>;
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
