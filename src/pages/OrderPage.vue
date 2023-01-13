<template>
  <q-page padding class="row items-center justify-start" style="flex-direction: column;">
    <!-- content -->
    <order-component
      v-if='renderComponent'
      :orderForm='orderForm'
      :admin='adminProp'
      :display='displayProp'
      :dbConn="dbConn">
    </order-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import OrderComponent from 'components/OrderComponent.vue';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

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
const orderForm = ref(false);

// DECLARATIONS
if (route.params.type != '') {
  // console.log(route.params.type);
  adminProp.value = route.params.type === 'admin' ? true : false;
  displayProp.value = route.params.type === 'display' ? true : false;
}
// forceOrderRerender();

// WATCHERS
watch(
  route,
  async (newR) => {
    adminProp.value = newR.params.type === 'admin' ? true : false;
    displayProp.value = newR.params.type === 'display' ? true: false;
    orderForm.value = false;
    forceOrderRerender();
  },
)

// FUNCTIONS
async function forceOrderRerender() {
  renderComponent.value = false;
  nextTick();
  renderComponent.value = true;
};

// LIFECYCLE EVENTS
onMounted(() => {
  emit('change-tab', undefined);
});
</script>
