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

<style>
</style>
