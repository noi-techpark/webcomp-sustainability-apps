<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <LineChart :data="data" :labels="labels" />
    <div class="list">
      <div v-for="(item, index) in sortedData" :key="index" class="list-item">
        <div class="px-2 label">{{ item.label }}</div>
        <div class="column value">
          <span>{{ item.value }} {{ props.data.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LineChart from '../charts/LineChart.vue';
import { LineChartData } from '@/models/lineChartData.model';
interface Props {
  data: LineChartData;
}

const props = defineProps<Props>();

const labels = computed(() => props.data.data?.map((item) => item.label));
const data = computed(() => props.data.data?.map((item) => Number(item.value)));
const sortedData = computed(() => {
  const dataCopy = [...props.data.data];
  return dataCopy.sort(
    (a, b) => new Date(b.label).getTime() - new Date(a.label).getTime()
  );
});
</script>

<style scoped>
.list-item {
  display: flex;
  font-size: 12px;
  padding: 4px 0;
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
