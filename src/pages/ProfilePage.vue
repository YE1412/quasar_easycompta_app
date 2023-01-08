<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <profile-component
      :dbConn="dbConn"></profile-component>
  </q-page>
</template>

<script setup lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { ref, onMounted } from 'vue';
import ProfileComponent from 'components/ProfileComponent.vue';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';

// VARIABLES
interface ProfilePageProps {
  dbConn?: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<ProfilePageProps>(), {
  dbConn: null,
});
const emit = defineEmits(['change-tab']);
// console.log(props.dbConn);
// LIFECYCLE EVENTS
onMounted(() => {
  emit('change-tab', 'profile')
})
</script>
