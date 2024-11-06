<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="store.loading">Loading...</div>
  <div v-else class="container">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <GridElement
          :font-color="props.fontColor"
          :title="t(gridElementDefinitions[0].title)"
          :value="gridElementDefinitions[0].value.value"
          :unit="gridElementDefinitions[0].unit"
          :sources="props.activeSources"
          :slotTitles="[t('chart-type.over-time')]"
          @update:index="(index) => updateColumnsData(0, index)">
          <template #slide-0>
            <LineChartContainer
              :data="gridElementDefinitions[0].historicData.value" />
          </template>
        </GridElement>
        <GridElement
          :font-color="props.fontColor"
          :title="t(gridElementDefinitions[1].title)"
          :value="gridElementDefinitions[1].value.value"
          :unit="gridElementDefinitions[1].unit"
          :sources="props.activeSources"
          :slotTitles="[t('chart-type.over-time')]"
          @update:index="(index) => updateColumnsData(1, index)">
          <template #slide-0>
            <LineChartContainer
              :data="gridElementDefinitions[1].historicData.value" />
          </template>
        </GridElement>
      </div>
      <div class="col-lg-4 col-md-12">
        <GridElement
          :font-color="props.fontColor"
          :title="t(gridElementDefinitions[2].title)"
          :value="gridElementDefinitions[2].value.value"
          :unit="gridElementDefinitions[2].unit"
          :sources="props.activeSources"
          :slotTitles="[t('chart-type.over-time')]"
          @update:index="(index) => updateColumnsData(0, index)">
          <template #slide-0>
            <LineChartContainer
              :data="gridElementDefinitions[2].historicData.value" />
          </template>
        </GridElement>
        <GridElement
          :font-color="props.fontColor"
          :title="t(gridElementDefinitions[3].title)"
          :value="gridElementDefinitions[3].value.value"
          :unit="gridElementDefinitions[3].unit"
          :sources="props.activeSources"
          :slotTitles="[t('chart-type.over-time')]"
          @update:index="(index) => updateColumnsData(1, index)">
          <template #slide-0>
            <LineChartContainer
              :data="gridElementDefinitions[3].historicData.value" />
          </template>
        </GridElement>
      </div>
      <GridElement
        class="col-lg-4 col-md-12 d-flex flex-column"
        :font-color="props.fontColor"
        :title="t('overall-ranking')"
        :value="'Leader: ' + columnsData[2].columnValue"
        :sources="props.activeSources"
        :slotTitles="[
          t('kilometres-travelled'),
          t('co2-saved'),
          t('participants'),
          t('money-saved'),
        ]"
        @update:index="(index) => updateColumnsData(2, index)">
        <template #slide-0>
          <SearchContainer
            :selected-organisation="store.selectedOrganizationFilter"
            :sorted-organisations="sortedKmTotalOrganisations" />
        </template>
        <template #slide-1>
          <SearchContainer
            :selected-organisation="store.selectedOrganizationFilter"
            :sorted-organisations="sortedCo2Organisations" />
        </template>
        <template #slide-2>
          <SearchContainer
            :selected-organisation="store.selectedOrganizationFilter"
            :sorted-organisations="sortedNumberOfPeopleOrganisations" />
        </template>
        <template #slide-3>
          <SearchContainer
            :selected-organisation="store.selectedOrganizationFilter"
            :sorted-organisations="sortedMoneySavedOrganisations"
        /></template>
      </GridElement>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, reactive } from 'vue';
import LineChartContainer from '@/components/containers/LineChartContainer.vue';
import SearchContainer from '@/components/containers/SearchContainer.vue';
import { suedtirolRadeltStore } from '@/stores/suedtirolRadeltStore';
import { useI18n } from 'vue-i18n';
import GridElement from '../library/GridElement.vue';
import { LineChartData } from '@/models/lineChartData.model';
import { SuedtirolRadeltItem } from '@/models/suedtirolRadeltItem.model';

interface Props {
  activeSources: string[];
  fontColor: string;
  selectedOrganisation?: string;
}

const props = defineProps<Props>();
const store = suedtirolRadeltStore();
const { t } = useI18n();

onMounted(() => {
  store.loadCompanyGamificationActions();
  store.selectedOrganizationFilter = props.selectedOrganisation;
});

const formatValue = (value: number, minDigits: number, maxDigits: number) =>
  value.toLocaleString('de-DE', {
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  });

const filterOrganisations = () =>
  Object.fromEntries(
    Object.entries(store.latestData)
      .filter(
        ([, org]) =>
          !store.selectedOrganizationFilter ||
          org.sname.toLowerCase() ===
            store.selectedOrganizationFilter.toLowerCase()
      )
      .filter(
        ([key]) =>
          !store.selectedActionFilter ||
          key.includes(store.selectedActionFilter)
      )
  );

const calculateTotalValue = (
  metric: string,
  minDigits: number,
  maxDigits: number
): string => {
  const total = Object.values(filterOrganisations()).reduce(
    (sum, organisation) => {
      const valueEntry = organisation.values.find((v) => v.tname === metric);

      return sum + (valueEntry?.totalMValue || 0);
    },
    0
  );

  return formatValue(total, minDigits, maxDigits);
};

const kmTotal = computed(() => calculateTotalValue('km_total', 0, 2));
const co2 = computed(() => calculateTotalValue('co2', 0, 2));
const numberOfPeople = computed(() =>
  calculateTotalValue('number_of_people', 0, 0)
);
const moneySaved = computed(() => calculateTotalValue('money_saved', 2, 2));

const sortOrganisations = (metric: string) => {
  const filteredOrganisations = Object.entries(store.latestData ?? {})
    .filter(
      ([key]) =>
        !store.selectedActionFilter || key.includes(store.selectedActionFilter)
    )
    .map(([, org]) => org);

  const orgMap = filteredOrganisations.reduce(
    (acc, org) => {
      const entry = org.values.find((value) => value.tname === metric);

      if (entry) {
        if (!acc[org.sname]) {
          acc[org.sname] = {
            sname: org.sname,
            totalMValue: entry.totalMValue ?? 0,
            tunit: metric !== 'number_of_people' ? entry.tunit : '',
          };
        } else {
          acc[org.sname].totalMValue += entry.totalMValue ?? 0;
        }
      }

      return acc;
    },
    {} as Record<string, { sname: string; totalMValue: number; tunit: string }>
  );

  return Object.values(orgMap).sort((a, b) => b.totalMValue - a.totalMValue);
};

const sortedKmTotalOrganisations = computed(() =>
  sortOrganisations('km_total')
);
const sortedCo2Organisations = computed(() => sortOrganisations('co2'));
const sortedNumberOfPeopleOrganisations = computed(() =>
  sortOrganisations('number_of_people')
);
const sortedMoneySavedOrganisations = computed(() =>
  sortOrganisations('money_saved')
);

const extractHistoricData = (metric: string): LineChartData => {
  const filteredMetric = Object.fromEntries(
    Object.entries(store.historicData).map(([date, data]) => [
      date,
      data
        .filter((d) => d.tname == metric)
        .filter((d) =>
          store.selectedOrganizationFilter
            ? d.sname.includes(store.selectedOrganizationFilter)
            : true
        ),
    ])
  ) as Record<string, SuedtirolRadeltItem[]>;

  const unit = Object.values(filteredMetric)[0]?.[0]?.tunit ?? '';

  return {
    data: Object.entries(filteredMetric).map(([key, data]) => ({
      label: key,
      value: data.reduce((sum, d) => sum + (d.mvalue ?? 0), 0).toFixed(2),
    })),
    unit: unit === 'count' ? '' : unit,
  };
};

const gridElementDefinitions = [
  {
    title: 'kilometres-travelled',
    value: kmTotal,
    unit: 'km',
    historicData: computed(() => extractHistoricData('km_total')),
  },
  {
    title: 'participants',
    value: numberOfPeople,
    unit: '',
    historicData: computed(() => extractHistoricData('number_of_people')),
  },
  {
    title: 'co2-saved',
    value: co2,
    unit: 'kg',
    historicData: computed(() => extractHistoricData('co2')),
  },
  {
    title: 'money-saved',
    value: moneySaved,
    unit: 'EUR',
    historicData: computed(() => extractHistoricData('money_saved')),
  },
];

const columnDefinitions = [
  {
    titles: ['kilometres-travelled', 'participants'],
    units: ['km', ''],
    values: [kmTotal, numberOfPeople],
  },
  {
    titles: ['co2-saved', 'money-saved'],
    units: ['kg', 'EUR'],
    values: [co2, moneySaved],
  },
  {
    titles: [
      'kilometres-travelled',
      'co2-saved',
      'participants',
      'money-saved',
    ],
    units: ['', '', '', ''],
    values: [
      computed(() => sortedKmTotalOrganisations.value[0]?.sname ?? ''),
      computed(() => sortedCo2Organisations.value[0]?.sname ?? ''),
      computed(() => sortedNumberOfPeopleOrganisations.value[0]?.sname ?? ''),
      computed(() => sortedMoneySavedOrganisations.value[0]?.sname ?? ''),
    ],
  },
];

const columnsData = reactive(
  columnDefinitions.map((dataSet) => ({
    columnTitle: dataSet.titles[0],
    columnValue: dataSet.values[0].value,
    columnUnit: dataSet.units[0],
  }))
);

const updateColumnsData = (setIndex: number, itemIndex: number) => {
  const { titles, values, units } = columnDefinitions[setIndex];
  columnsData[setIndex].columnTitle = titles[itemIndex];
  columnsData[setIndex].columnValue = values[itemIndex].value;
  columnsData[setIndex].columnUnit = units[itemIndex];
};

watch([() => store.latestData, () => store.selectedActionFilter], () => {
  columnsData[0].columnValue = kmTotal.value;
  columnsData[1].columnValue = co2.value;
  columnsData[2].columnValue = sortedKmTotalOrganisations.value[0]?.sname ?? '';
});
</script>
