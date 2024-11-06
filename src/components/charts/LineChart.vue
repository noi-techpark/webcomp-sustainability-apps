<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <Line :data="computedChartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ScriptableContext,
  ChartArea,
} from 'chart.js';

interface Props {
  data: number[];
  labels: string[];
}

const props = defineProps<Props>();

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

const getGradient = function (
  ctx: CanvasRenderingContext2D,
  chartArea: ChartArea
) {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#1B59F81A');
    gradient.addColorStop(1, '#42C320');

    return gradient;
  }
};
const computedChartData = computed(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        label: 'Data One',
        borderColor: function (context: ScriptableContext<'line'>) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
        data: props.data,
        pointRadius: 0,
        tension: 0.3,
        borderWidth: 6,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        drawOnChartArea: false,
      },
      offset: false,
      ticks: {
        color: '#ADB5BD',
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: '#ADB5BD',
        callback: function (tickValue: string | number) {
          if (typeof tickValue === 'number') {
            if (tickValue >= 1000000) {
              return tickValue / 1000000 + 'Mil.';
            } else if (tickValue >= 1000) {
              return tickValue / 1000 + 'k';
            } else {
              return tickValue.toPrecision(3);
            }
          }
          return tickValue;
        },
      },
    },
  },
  responsive: true,
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
<style scoped>
canvas {
  height: 130px !important;
}
</style>
