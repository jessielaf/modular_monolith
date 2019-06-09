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
