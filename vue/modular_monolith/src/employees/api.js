import axios from "axios";
import Api from "@/api";

const prefix = "/api/employees/";

const urls = {
  default: prefix,
  retrieve: id => `${prefix}${id}/`
};

export default class EmployeeApi extends Api {
  static create(object) {
    return axios.post(urls.default, object);
  }

  static retrieve(id) {
    return axios.get(urls.retrieve(id));
  }

  static overview() {
    return axios.get(urls.default);
  }

  static route() {
    return {
      path: "/employees",
      component: () => import("../components/Container.vue"),
      children: [
        {
          path: "/",
          name: "employee-overview",
          component: () => import("./Overview.vue")
        },
        {
          path: "create",
          name: "employee-create",
          component: () => import("./Create.vue")
        },
        {
          path: ":id",
          name: "employee-detail",
          component: () => import("./Detail.vue")
        }
      ]
    };
  }
}
