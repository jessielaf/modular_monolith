<template>
  <div>
    <router-link :to="{ name: 'employee-overview' }">Employees</router-link>
    <router-link :to="{ name: 'shift-overview' }" style="margin-left: 10px;">
      Shifts
    </router-link>
    <router-view />
  </div>
</template>
