<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="row mx-4">
    <div class="col-12 col-md-3">
      <h2 class="title">{{ t('south-tyrols-sustainability') }}</h2>
    </div>
    <div class="source col-12 col-md-9">
      <!--
      <div
        v-for="(source, index) in props.sources"
        :key="index"
        class="px-2 d-flex align-items-center source-item"
        @click="toggleSource(source)">
        <h4 class="source-text">{{ source }}</h4>
        <svg
          v-if="isActive(source)"
          class="source-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <rect y="5" width="24" height="14" rx="7" fill="black" />
          <rect x="12" y="7" width="10" height="10" rx="5" fill="white" />
        </svg>
        <svg
          v-else
          class="source-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <rect y="4" width="24" height="15" rx="7.5" fill="#CED4DA" />
          <rect x="2" y="6" width="11" height="11" rx="5.5" fill="white" />
        </svg>
      </div>
      -->
      <div
        v-if="props.showOrganizationFilter"
        style="height: 100%; display: flex; align-items: center">
        <span>{{ t('organization-filter.label') }}: </span>
      </div>

      <div v-if="props.showOrganizationFilter" class="dropdown">
        <button
          class="btn btn-secondary rounded-5 border-0 px-4 py-2"
          style="background-color: #e9ecef; color: #666666"
          @click="toggleOrganizationDropdown"
          type="button">
          {{
            store.selectedOrganizationFilter
              ? store.selectedOrganizationFilter.length > 20
                ? store.selectedOrganizationFilter.substring(0, 20) + '...'
                : store.selectedOrganizationFilter
              : t('organization-filter.all')
          }}
          <drop-down-toggle class="ms-4" alt="arrow-left" />
        </button>
        <ul v-show="isOrganizationDropdownOpen" class="dropdown-menu">
          <li
            v-for="(filter, index) in [
              t('organization-filter.all'),
              ...sortedOrganizationFilters,
            ]"
            style="cursor: pointer"
            :key="index">
            <a
              class="dropdown-item"
              @click="
                selectOrganizationFilter(index === 0 ? undefined : filter)
              "
              >{{ filter }}</a
            >
          </li>
        </ul>
      </div>

      <div
        v-if="props.showSustainabilityActionFilter"
        style="height: 100%; display: flex; align-items: center">
        <span>{{ t('sustainability-action-filter.label') }}: </span>
      </div>

      <div v-if="props.showSustainabilityActionFilter" class="dropdown">
        <button
          class="btn btn-secondary rounded-5 border-0 px-4 py-2"
          style="background-color: #e9ecef; color: #666666"
          @click="toggleActionDropdown"
          type="button">
          {{
            store.selectedActionFilter
              ? store.selectedActionFilter
              : t('sustainability-action-filter.all')
          }}
          <drop-down-toggle class="ms-4" alt="arrow-left" />
        </button>
        <ul v-show="isActionDropdownOpen" class="dropdown-menu">
          <li
            v-for="(filter, index) in [
              t('sustainability-action-filter.all'),
              ...store.actionFilters,
            ]"
            style="cursor: pointer"
            :key="index">
            <a
              class="dropdown-item"
              @click="selectActionFilter(index === 0 ? undefined : filter)"
              >{{ filter }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { suedtirolRadeltStore } from '@/stores/suedtirolRadeltStore';
import { useI18n } from 'vue-i18n';
import DropDownToggle from '@/assets/img/dropdown_toggle.svg';

interface Props {
  sources: string[];
  activeSources: string[];
  showOrganizationFilter: boolean;
  showSustainabilityActionFilter: boolean;
}

const props = defineProps<Props>();
const store = suedtirolRadeltStore();
const { t } = useI18n();

const isActionDropdownOpen = ref(false);
const isOrganizationDropdownOpen = ref(false);

const sortedOrganizationFilters = computed(() => {
  return [...store.organizationFilters].sort();
});

const toggleActionDropdown = () => {
  isActionDropdownOpen.value = !isActionDropdownOpen.value;
};

const toggleOrganizationDropdown = () => {
  isOrganizationDropdownOpen.value = !isOrganizationDropdownOpen.value;
};

const selectActionFilter = (filter?: string) => {
  store.setSelectedActionFilter(filter);
  isActionDropdownOpen.value = false;
};

const selectOrganizationFilter = (filter?: string) => {
  store.setSelectedOrganizationFilter(filter);
  isOrganizationDropdownOpen.value = false;
};
</script>

<style scoped>
.title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .title {
    text-align: center;
  }
}

.source {
  justify-content: flex-end;
  display: flex;
  padding-bottom: 20px;
  align-items: flex-start;
  gap: 16px;
  font-size: 15px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  display: block;
  overflow-y: auto;
  max-height: 200px;
}

.source-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.source-text {
  font-size: 15px;
  font-weight: bold;
  padding: 0 8px;
  margin: 0;
}

.source-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}
</style>
