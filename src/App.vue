<template>
  <router-view @language-rerender="rerender" v-if="renderComponent"/>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

// VARIABLES
const renderComponent = ref(true);

// FUNCTIONS
async function rerender(){
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
}
</script>
