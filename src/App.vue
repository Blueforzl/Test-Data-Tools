<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Generator from "./Generator/index.vue";
import Read from "./Read/index.vue";
import Write from "./Write/index.vue";

const route = ref("");
const enterAction = ref({});

onMounted(() => {
  window.utools.onPluginEnter((action) => {
    route.value = action.code;
    enterAction.value = action;
  });
  window.utools.onPluginOut((isKill) => {
    route.value = "";
  });
});
</script>

<template>
  <template v-if="route === 'generator' || route.startsWith('gen-')">
    <Generator :enterAction="enterAction"></Generator>
  </template>
  <template v-if="route === 'read'">
    <Read :enterAction="enterAction"></Read>
  </template>
  <template v-if="route === 'write'">
    <Write :enterAction="enterAction"></Write>
  </template>
</template>
