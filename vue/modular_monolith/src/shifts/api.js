import axios from "axios";
import Api from "@/api";

const prefix = "/api/shifts/";

const urls = {
  default: prefix,
  retrieve: id => `${prefix}${id}/`
};

export default class shiftApi extends Api {
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
      path: "/shifts",
      component: () => import("../components/Container.vue"),
      children: [
        {
          path: "/",
          name: "shift-overview",
          component: () => import("./Overview.vue")
        },
        {
          path: "create",
          name: "shift-create",
          component: () => import("./Create.vue")
        },
        {
          path: ":id",
          name: "shift-detail",
          component: () => import("./Detail.vue")
        }
      ]
    };
  }
}
