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

<style>
</style>
