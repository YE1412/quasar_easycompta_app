<template>
  <q-list>
    <q-item
      clickable
      v-if="!items.length">
      <q-btn
        flat
        :icon="icon !== undefined ? icon : ''"
        :label="title" 
        :to="{path: link}">
      </q-btn>
    </q-item>
    <q-item
      clickable
      v-if="items.length">
      <q-btn-dropdown stretch flat :label="title" :icon="icon">
        <q-list>
          <div v-for="(item, ind) in items" :key="ind">
            <q-item-label header>
              {{ item.header }}
            </q-item-label>
            <q-item clickable v-close-popup tabindex="0">
              <router-link :to="{path: item.link}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
                <q-item-section avatar>
                  <q-avatar :icon="item.avatar" color="secondary" text-color="white" font-size="25px"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.label }}</q-item-label>
                  <q-item-label v-if="item.caption">{{ item.caption }}</q-item-label>
                </q-item-section>
              </router-link>
            </q-item>
          </div>
        </q-list>
      </q-btn-dropdown>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
export interface ComptaLinkItem {
  header: string;
  avatar?: string;
  label?: string;
  caption?: string;
  link?: string;
} 
export interface ComptaLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  items?: ComptaLinkItem[];
}
withDefaults(defineProps<ComptaLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  items: () => ([]),
});
</script>
