<template>
  <q-page padding class="row items-center justify-start" style="flex-direction: column;">
    <!-- content -->
    <service-component 
      v-if='renderComponent'
      :serviceForm='serviceForm'
      :admin='adminProp'
      :display='displayProp'
      :dbConn="dbConn"></service-component>
  </q-page>
</template>

<script setup lang="ts">
import { Suspense, ref, nextTick, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ServiceComponent from 'components/ServiceComponent.vue';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';

// VARIABLES
interface PageProps {
  admin: boolean;
  display: boolean;
  dbConn?: SQLiteDBConnection;
};
const route = useRoute();
const props = withDefaults(defineProps<PageProps>(), {
  admin: true,
  display: false,
  dbConn: null,
});
const emit = defineEmits(['change-tab']);
const adminProp = ref(props.admin);
const displayProp = ref(props.display);
const renderComponent = ref(true);
const serviceForm = ref(false);

// DECLARATIONS
if (route.params.type !== '') {
  adminProp.value = route.params.type === 'admin' ? true : false;
  displayProp.value = route.params.type === 'display' ? true : false;
}

// WATCHERS
watch(
  route,
  async (newR) => {
    adminProp.value = newR.params.type === 'admin' ? true : false;
    displayProp.value = newR.params.type === 'display' ? true : false;
    serviceForm.value = false;
    forceServiceRenderer();
  }
)

// FUNCTIONS
async function forceServiceRenderer(){
  renderComponent.value = false;

  await nextTick();

  renderComponent.value = true;
};

// LIFECYCLE EVENTS
onMounted(() => {
  emit('change-tab', undefined);
})
</script>
