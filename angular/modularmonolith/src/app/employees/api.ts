import { Api } from "../api";
import { ListRoutingModule } from "./list/list-routing.module";
import { EmployeeService } from "./service.service";
import { CreateRoutingModule } from "./create/create-routing.module";
import { CreateModule } from "./create/create.module";
import { ListModule } from "./list/list.module";
import { DetailRoutingModule } from "./detail/detail-routing.module";
import { DetailModule } from "./detail/detail.module";

class EmployeeApi implements Api {
  static exportedModules(): any[] {
    return [
      ListRoutingModule,
      ListModule,
      CreateRoutingModule,
      CreateModule,
      DetailRoutingModule,
      DetailModule
    ];
  }

  static service(): any {
    return EmployeeService;
  }
}

export default EmployeeApi;
