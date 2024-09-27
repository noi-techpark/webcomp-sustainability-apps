<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <!--
      <LineChart
        :data="DATA"
        :labels="LABELS" />
        -->
    <div v-for="(item, index) in props.rowData" :key="index" class="list-item">
      <h4 class="px-2 label">{{ item.label }}</h4>
      <div class="column value">
        <span>{{ item.value }} {{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Row {
  label: string;
  value: string;
  unit: string;
}

interface Props {
  rowData: Row[];
}

const props = defineProps<Props>();
</script>

<style scoped>
h4 {
  font-weight: bold;
  font-size: 15px;
  margin: 0;
}

.list-item {
  display: flex;
  padding: 6px 0;
  align-items: center;
  border-bottom: 1px solid #ced4da;
}

.label {
  font-weight: bold;
}

.column {
  flex: 1;
}

.value {
  text-align: right;
}
</style>
