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
