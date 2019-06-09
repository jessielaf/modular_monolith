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
