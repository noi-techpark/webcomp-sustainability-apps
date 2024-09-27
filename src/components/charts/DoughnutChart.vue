<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="chart-container">
    <div v-if="props.centerLabel" class="center-label">2024</div>
    <Doughnut :options="chartOptions" :data="computedChartData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement } from 'chart.js';

interface Props {
  centerLabel: string;
  data: number[];
}

const props = defineProps<Props>();

ChartJS.register(ArcElement);

const computedChartData = computed(() => {
  return {
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          '#8AD2E9',
          '#9BC320',
          '#EAB308',
          '#E46651',
          '#333434',
        ],
      },
    ],
  };
});

const chartOptions = computed(() => ({
  animation: {
    duration: 0,
  },
  responsive: false,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  cutout: '75%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
}));
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

canvas {
  width: auto !important;
  height: 130px !important;
}

.center-label {
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -12px;
  font-weight: bold;
  font-size: 18px;
  z-index: 999999999999999;
}
</style>
