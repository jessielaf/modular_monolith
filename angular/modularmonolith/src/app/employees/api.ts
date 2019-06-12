import { Api } from "../api";
import { ListRoutingModule } from "./list/list-routing.module";
import { EmployeeService } from "./service.service";
import { ListComponent } from "./list/list.component";

class EmployeeApi implements Api {
  static exportedComponents(): any[] {
    return [ListComponent];
  }

  static exportedRoutes(): any[] {
    return [ListRoutingModule];
  }

  static service(): any {
    return EmployeeService;
  }
}

export default EmployeeApi;
