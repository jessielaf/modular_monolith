import Vue from "vue";
import Router from "vue-router";
import EmployeeApi from "@/employees/api";
import ShiftApi from "@/shifts/api";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [EmployeeApi.route(), ShiftApi.route()]
});
