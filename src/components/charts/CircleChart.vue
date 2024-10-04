<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <Doughnut :options="chartOptions" :data="computedChartData" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement } from 'chart.js';

interface Props {
  data: number[];
}

const props = defineProps<Props>();

ChartJS.register(ArcElement);

const computedChartData = computed(() => {
  const sum: number = props.data.reduce((sum, dataItem) => sum + dataItem, 0);

  const colors = ['#8AD2E9', '#9BC320', '#EAB308', '#C95836'];
  return {
    datasets: props.data.map((dataItem, index) => ({
      data: [dataItem, sum / dataItem],
      borderRadius: 20,
      backgroundColor: [colors[index], '#DEE2E6'],
    })),
  };
});

const chartOptions = computed(() => ({
  animation: {
    duration: 0,
  },
  aspectRatio: 2,
  responsive: false,
  cutout: '70%',
  circumference: 180,
  rotation: 270,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  layout: {
    padding: 0,
  },
}));
</script>
<style scoped>
canvas {
  height: 129px !important;
  width: auto !important;
}
</style>
