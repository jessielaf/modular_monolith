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
