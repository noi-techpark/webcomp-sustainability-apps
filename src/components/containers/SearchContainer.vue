<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div>
      <h4>{{ props.title }}</h4>
    </div>
    <div class="content">
      <div class="search-row space-between">
        <input
          type="text"
          placeholder="Suche"
          class="search-input"
          v-model="searchQuery" />
        <div class="search-icon justify-self-end">
          <search-icon style="padding-right: 2px" alt="search-icon" />
        </div>
      </div>

      <div
        :class="{
          'scroll-enabled':
            !props.selectedOrganisation ||
            filteredData.selectedOrganisationIndex === -1,
        }">
        <div v-for="(item, index) in filteredData.data" :key="index">
          <div
            v-if="
              item.sname.toLowerCase() ===
              props.selectedOrganisation?.toLowerCase()
            "
            class="ellipsis">
            {{ filteredData.showTopEllipsis ? '...' : '' }}
          </div>
          <div
            :class="[
              'list-item',
              {
                'selected-organisation':
                  item.sname.toLowerCase() ===
                  props.selectedOrganisation?.toLowerCase(),
              },
            ]">
            <div class="label-container">
              <h4 class="label px-2">{{ item.sname }}</h4>
            </div>
            <div class="amount">
              <span
                >{{ item.totalMValue.toLocaleString('de-DE') }}
                {{ item.tunit }}</span
              >
            </div>
          </div>
          <div
            v-if="
              item.sname.toLowerCase() ===
              props.selectedOrganisation?.toLowerCase()
            "
            class="ellipsis"
            style="margin-top: -10px">
            {{ filteredData.showBottomEllipsis ? '...' : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SearchIcon from '@/assets/img/search-icon.svg';

interface Props {
  title: string;
  selectedOrganisation: string | undefined;
  sortedOrganisations: { sname: string; totalMValue: number; tunit: string }[];
}

const props = defineProps<Props>();

const searchQuery = ref('');

const filteredData = computed(() => {
  // Filtered list based on search query
  let filtered = props.sortedOrganisations.filter((item) =>
    item.sname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  const maxItems = 6;

  // Check if selected organisation is present
  const selectedOrganisationIndex = filtered.findIndex(
    (item) =>
      item.sname.toLowerCase() === props.selectedOrganisation?.toLowerCase()
  );

  // If no selectedOrganisation is defined or not found in the list, show the full list (scrollable)
  if (!props.selectedOrganisation || selectedOrganisationIndex === -1) {
    return {
      data: filtered, // Return the full list
      selectedOrganisationIndex: selectedOrganisationIndex,
      showTopEllipsis: false,
      showBottomEllipsis: false,
    };
  }

  if (selectedOrganisationIndex < maxItems) {
    // The selected organisation is within the top maxItems, slice the list
    return {
      data: filtered.slice(0, maxItems),
      selectedOrganisationIndex: selectedOrganisationIndex,
      showTopEllipsis: false,
      showBottomEllipsis: false,
    };
  }

  // The selected organisation is beyond the top maxItems
  let topItems = filtered.slice(0, 3);
  let followingItems = filtered.slice(
    selectedOrganisationIndex + 1,
    selectedOrganisationIndex + 3
  );

  // If the selected organisation is the last or penultimate item, ensure we get the other top items
  if (
    selectedOrganisationIndex === filtered.length - 1 ||
    selectedOrganisationIndex === filtered.length - 2
  ) {
    const isLast = selectedOrganisationIndex === filtered.length - 1;

    if (isLast) {
      return {
        data: [...filtered.slice(0, 5), filtered[selectedOrganisationIndex]],
        selectedOrganisationIndex: selectedOrganisationIndex,
        showTopEllipsis: true,
        showBottomEllipsis: false,
      };
    } else {
      return {
        data: [
          ...filtered.slice(0, 4),
          filtered[selectedOrganisationIndex],
          filtered[filtered.length - 1],
        ],
        selectedOrganisationIndex: selectedOrganisationIndex,
        showTopEllipsis: true,
        showBottomEllipsis: false,
      };
    }
  } else {
    return {
      data: [
        ...topItems,
        filtered[selectedOrganisationIndex],
        ...followingItems,
      ],
      selectedOrganisationIndex: selectedOrganisationIndex,
      showTopEllipsis: true,
      showBottomEllipsis: true,
    };
  }
});
</script>

<style scoped>
.content {
  padding: 20px 14px 0 14px;
}

.scroll-enabled {
  max-height: 300px;
  overflow-y: auto;
}

.search-input {
  width: auto;
  height: 100%;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  background-color: transparent;
}

.search-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border-radius: 30px;
  border: 2px solid #ced4da;
  height: 36px;
  .search-icon {
    border-left: 1px solid #ced4da;
  }
  input {
    border: none;
    padding: 8px 16px;
    font-size: 15px;
    background-color: transparent;
  }
  input:focus {
    outline: none;
  }
}

h4 {
  font-weight: bold;
  font-size: 15px;
  margin: 0;
}

.list-item {
  display: flex;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid #ced4da;
}

.selected-organisation {
  padding: 6px 12px;
  border: 2px solid #ced4da;
  border-radius: 32px;
}

.label-container {
  flex: 2;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
}

.label {
  text-overflow: ellipsis;
  overflow: hidden;
}

.amount {
  flex: 1;
  text-align: right;
}

.ellipsis {
  color: #dee2e6;
  font-size: 18px;
  height: 26px;
}
</style>
