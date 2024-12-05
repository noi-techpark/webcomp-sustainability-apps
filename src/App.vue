<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div id="container" :style="{ fontFamily: props.fontFamily }">
    <Header
      :sources="sources"
      :active-sources="activeSources"
      :showSustainabilityActionFilter="
        props.showSustainabilityActionFilter === 'true'
      "
      :showOrganizationFilter="props.showOrganizationFilter === 'true'"
      @update-active-sources="handleUpdateActiveSources" />
    <SuedtirolRadelt
      v-if="showSuedtirolRadelt()"
      :active-sources="activeSources"
      :font-color="props.fontColor"
      :selected-organisation="props.selectedOrganisation" />
    <!--
    <Ummadum
      v-if="showUmmadum()"
      :active-sources="activeSources"
      :font-color="props.fontColor" />
    <Lockall
      v-if="showLockall()"
      :active-sources="activeSources"
      :font-color="props.fontColor" /> -->
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/library/Header.vue';
import SuedtirolRadelt from '@/components/apps/SuedtirolRadelt.vue';
import { LOCKALL, SUEDTIROL_RADELT, UMMADUM } from '@/common';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
  language: string;
  fontColor: string;
  fontFamily: string;
  showSustainabilityActionFilter: string;
  showOrganizationFilter: string;
  selectedOrganisation?: string;
}

const props = defineProps<Props>();
const sources = [SUEDTIROL_RADELT, UMMADUM, LOCKALL];

const activeSources = ref<string[]>([SUEDTIROL_RADELT]);

const t = useI18n();
t.locale.value = props.language ?? 'en';

const showSuedtirolRadelt = function (): boolean {
  return (
    activeSources.value.length === 1 &&
    activeSources.value.includes(SUEDTIROL_RADELT)
  );
};

const handleUpdateActiveSources = function (newActiveSources: string[]) {
  activeSources.value = newActiveSources;
};
</script>

<style>
#container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 12px 8px 8px 8px;
}
</style>
