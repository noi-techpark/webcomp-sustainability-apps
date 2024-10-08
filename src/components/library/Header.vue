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
        v-if="props.showSustainabilityActionFilter"
        style="height: 100%; display: flex; align-items: center">
        <span>{{ t('sustainability-action-filter.label') }}: </span>
      </div>

      <div v-if="props.showSustainabilityActionFilter" class="dropdown">
        <button
          class="btn btn-secondary rounded-5 border-0 px-4 py-2"
          style="background-color: #e9ecef; color: #666666"
          @click="toggleDropdown"
          type="button">
          {{
            store.selectedActionFilter
              ? store.selectedActionFilter
              : t('sustainability-action-filter.all')
          }}
          <drop-down-toggle class="ms-4" alt="arrow-left" />
        </button>
        <ul v-show="isDropdownOpen" class="dropdown-menu">
          <li
            v-for="(filter, index) in [
              t('sustainability-action-filter.all'),
              ...store.actionFilters,
            ]"
            style="cursor: pointer"
            :key="index">
            <a
              class="dropdown-item"
              @click="selectFilter(index === 0 ? null : filter)"
              >{{ filter }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { suedtirolRadeltStore } from '@/stores/suedtirolRadeltStore';
import { useI18n } from 'vue-i18n';
import DropDownToggle from '@/assets/img/dropdown_toggle.svg';

interface Props {
  sources: string[];
  activeSources: string[];
  showSustainabilityActionFilter: boolean;
}

const props = defineProps<Props>();
const store = suedtirolRadeltStore();
const { t } = useI18n();

const emit = defineEmits<{
  (event: 'update-active-sources', newActiveSources: string[]): void;
}>();

const isActive = function (source: string): boolean {
  return props.activeSources.includes(source);
};

const toggleSource = function (source: string) {
  if (isActive(source) && props.activeSources.length === 1) {
    return;
  }
  if (source === 'lock.all') {
    emit('update-active-sources', ['lock.all']);
  } else if (props.activeSources.includes('lock.all')) {
    emit('update-active-sources', [source]);
  } else {
    const index = props.activeSources.indexOf(source);
    const newActiveSources = [...props.activeSources];
    if (index === -1) {
      newActiveSources.push(source);
    } else {
      newActiveSources.splice(index, 1);
    }
    if (newActiveSources.length > 0) {
      emit('update-active-sources', newActiveSources);
    }
  }
};

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectFilter = (filter: string | null) => {
  store.setSelectedActionFilter(filter);
  isDropdownOpen.value = false;
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
