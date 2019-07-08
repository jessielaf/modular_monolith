The versions used are:

-   Vue 3.8.2

-   Node 10.15.3

-   npm 6.4.1

To install Vue run:

      npm install -g @vue/cli

Then create the project

      vue create modular_monolith

Choose `Manually select features` and select these features:

-   Babel

-   Router

-   Linter / Formatter

Then answer: yes, basic, lint on save, dedicated config file

Now replace the code in `src/components/Container.vue` with

      <template>
        <router-view />
      </template>

We can now create the API in `src/api.js`

      export default class Api {
        static create(object) {
          console.log(object, "not saved");
          console.error("Implement the create functionality");
        }

        static retrieve(id) {
          console.log(id, "not retrieved");
          console.error("Implement the retrieve functionality");
        }

        static overview() {
          console.error("Implement the overview functionality");
        }
        
        static route() {
          console.error("Returns the route for the router");
        }
      }

You can see the route function was added. This is because vue uses one
route file in which the api will be called and insert the routes of that
module.

Vue does not come with an HTTP Client so that is what needs to be
installed.

      npm install --save axios

Now the start of the employee module is creating the api in
`src/employees/api.js`

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

Now create the three views, create, detail and overview:

src/employees/Overview.vue

      <template>
        <div>
          <ul>
            <li v-for="employee in employees" :key="employee.id">
              <router-link
                :to="{ name: 'employee-detail', params: { id: employee.id } }"
                >{{ employee.name }}</router-link
              >
            </li>
          </ul>
          <router-link :to="{ name: 'employee-create' }">Create employee</router-link>
        </div>
      </template>

      <script>
      import api from "./api";

      export default {
        data: () => ({
          employees: []
        }),
        created() {
          api.overview().then(response => {
            this.employees = response.data;
          });
        }
      };
      </script>

src/employees/Detail.vue

      <template>
        <div>
          {{ employee.name }}

          <div>
            Shifts:
            <ul>
              <li v-for="shift in employee.shifts" :key="shift.id">
                {{ shift.title }}
              </li>
            </ul>
          </div>
        </div>
      </template>

      <script>
      import api from "./api";

      export default {
        data: () => ({
          employee: {}
        }),
        created() {
          api.retrieve(this.$route.params.id).then(response => {
            this.employee = response.data;
          });
        }
      };
      </script>

src/employees/Create.vue

      <template>
        <div>
          <form @submit.prevent="submit">
            <div>
              <label for="name">Name: </label>
              <input
                id="name"
                v-model="employee.name"
                placeholder="Name"
                type="text"
              />
            </div>

            <div>
              <label for="birthDate">Birth date: </label>
              <input
                id="birthDate"
                v-model="employee.birth_date"
                placeholder="01-04-1998"
                type="text"
              />
            </div>

            <div>
              <label for="email">Email: </label>
              <input
                id="email"
                v-model="employee.email"
                placeholder="jessie@example.com"
                type="email"
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </template>

      <script>
      import api from "@/employees/api";

      export default {
        data: () => ({
          employee: {}
        }),
        methods: {
          submit() {
            api.create(this.employee).then(() => {
              this.$router.push({ name: "employee-overview" });
            });
          }
        }
      };
      </script>

This is everything that has to be done for employees. Next is shifts:

src/shifts/api.js

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

src/shifts/Overview.vue

      <template>
        <div>
          <ul>
            <li v-for="shift in shifts" :key="shift.id">
              <router-link :to="{ name: 'shift-detail', params: { id: shift.id } }">
                {{ shift.title }}
              </router-link>
            </li>
          </ul>
          <router-link :to="{ name: 'shift-create' }">Create shift</router-link>
        </div>
      </template>

      <script>
      import api from "./api";

      export default {
        data: () => ({
          shifts: []
        }),
        created() {
          api.overview().then(response => {
            this.shifts = response.data;
          });
        }
      };
      </script>

src/shifts/Detail.vue

      <template>
        <div>
          {{ shift.title }}

          <div>
            Employees:
            <ul>
              <li v-for="employee in shift.employees" :key="employee.id">
                {{ employee.name }}
              </li>
            </ul>
          </div>
        </div>
      </template>

      <script>
      import api from "./api";

      export default {
        data: () => ({
          shift: {}
        }),
        created() {
          api.retrieve(this.$route.params.id).then(response => {
            this.shift = response.data;
          });
        }
      };
      </script>

src/shifts/Create.vue

      <template>
        <div>
          <form @submit.prevent="submit">
            <div>
              <label for="title">Title: </label>
              <input
                id="title"
                v-model="shift.title"
                placeholder="Title"
                type="text"
              />
            </div>

            <div>
              <label for="start">Start: </label>
              <input
                id="start"
                v-model="shift.start"
                placeholder="01-01-2019"
                type="text"
              />
            </div>

            <div>
              <label for="end">End: </label>
              <input
                id="end"
                v-model="shift.end"
                placeholder="01-01-2019"
                type="text"
              />
            </div>

            <div>
              <label for="employees">Employees: </label>
              <select id="employees" v-model="shift.employees" multiple>
                <option
                  v-for="employee in employees"
                  :key="employee.id"
                  :value="employee.id"
                  >{{ employee.name }}</option
                >
              </select>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </template>

      <script>
      import api from "@/shifts/api";
      import EmployeeApi from "@/employees/api";

      export default {
        created() {
          EmployeeApi.overview().then(response => {
            this.employees = response.data;
          });
        },
        data: () => ({
          shift: { employees: [] },
          employees: []
        }),
        methods: {
          submit() {
            api.create(this.shift).then(() => {
              this.$router.push({ name: "shift-overview" });
            });
          }
        }
      };
      </script>

In `src/shifts/Create.vue` there is an example on how to use the api
from another module. Where the employees are retrieved via the api of
employees.

The last thing to do is load the modules into the router. This can be
done by replacing the code inside `src/router.js` with:

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

Now the application can be ran by running `npm serve`
