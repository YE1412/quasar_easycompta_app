<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ t('errorNotFoundComponent.text') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="t('errorNotFoundComponent.buttonText')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

// VARIABLES
const { t } = useI18n();
const route = useRoute();

// LIFECYCE EVENTS
onMounted(() => {
  document.title = `Easy-Compta - ${t(route.meta.titleKey)}`;
});
</script>
