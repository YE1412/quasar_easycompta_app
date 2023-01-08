<template>
  <q-page padding class="row items-center justify-start">
    <!-- content -->
    <export-component
      v-if="renderComponent"
      :dbConn="dbConn"></export-component>
      <router-view :dbConn="dbConn"/>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import ExportComponent from 'components/ExportComponent.vue';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';

// VARIABLES
interface PageProps {
  dbConn?: SQLiteDBConnection | null;
};
const emit = defineEmits(['change-tab']);
const props = withDefaults(defineProps<PageProps>(), {
  dbConn: null
});
const renderComponent = ref(true);

// LIFECYCLE EVENTS
onMounted(() => {
  emit('change-tab', undefined);
});
</script>
