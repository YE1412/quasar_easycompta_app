<template>
  <q-page padding class="column items-center justify-evenly">
    <!-- content -->
    <register-form-component
      :dbConn="dbConn">
        
    </register-form-component>
  </q-page>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-unused-vars: off*/
import RegisterFormComponent from 'components/RegisterFormComponent.vue';

// VARIABLES
interface PageProps {
  dbConn?: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<PageProps>(), {
  dbConn: null,
});
</script>
