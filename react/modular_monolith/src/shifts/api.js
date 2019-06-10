import React from "react";
import axios from "axios";
import Api from "../api";
import { Route } from "react-router-dom";
import Overview from "./Overview";
import Detail from "./Detail";
import Create from "./Create";

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
    return (
      <div>
        <Route path="/shifts" exact component={Overview} />
        <Route path="/shifts/create" exact component={Create} />
        <Route path="/shift/:id" exact component={Detail} />
      </div>
    );
  }
}
