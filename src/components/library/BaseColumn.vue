<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="col-12 col-sm-6 col-md-4">
    <div class="title-container" :style="{ color: props.fontColor }">
      <div v-if="slotsCount > 1" class="carousel-nav" @click="prevComponent">
        <img
          src="../../assets/img/arrow_left.svg"
          class="carousel-icon"
          alt="arrow-left" />
      </div>
      <div class="title">
        {{ props.title }}
      </div>
      <div v-if="slotsCount > 1" class="carousel-nav" @click="nextComponent">
        <img
          src="../../assets/img/arrow_right.svg"
          class="carousel-icon"
          alt="arrow-right" />
      </div>
    </div>

    <button @click="toggleShow" class="ellipsis-container">
      <h1 class="ellipsis-text">
        <span :style="{ color: props.fontColor }">{{ props.value }}</span>
        {{ props.unit }}
      </h1>
    </button>

    <div v-if="showContent" class="details-container">
      <div class="circle-details">
        <img
          src="../../assets/img/minus_sign.svg"
          class="minus-sign"
          alt="minus-sign" />
      </div>
      <div class="details">{{ $t('hide-details') }}</div>
    </div>
    <div v-else class="details-container">
      <div class="circle-details">
        <img
          src="../../assets/img/plus_sign.svg"
          class="plus-sign"
          alt="plus-sign" />
      </div>
      <div class="details">{{ $t('show-details') }}</div>
    </div>

    <transition name="content">
      <div v-if="showContent" class="content-container">
        <transition :name="transitionName" mode="out-in">
          <div :key="key">
            <slot :name="`slide-${index}`"></slot>
          </div>
        </transition>
        <div style="margin-bottom: 12px"></div>
        <span class="source"
          >{{ $t('source') }}: {{ props.sources.join(', ') }}</span
        >
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  fontColor: string;
  sources: string[];
  title: string;
  value: string;
  unit?: string;
  slotsCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:index']);

// State management for toggle and carousel
const showContent = ref(true);
const index = ref(0);
const transitionName = ref('');

// Function to toggle show/hide details
const toggleShow = function () {
  showContent.value = !showContent.value;
};

// Carousel navigation logic
const nextComponent = function () {
  transitionName.value = 'slide-right';
  index.value = (index.value + 1) % props.slotsCount;
};

const prevComponent = function () {
  transitionName.value = 'slide-left';
  index.value = index.value === 0 ? props.slotsCount - 1 : index.value - 1;
};

// Computed property to update key for transition
const key = computed(() => `slide-${index.value}`);

watch(index, (newIndex) => {
  emit('update:index', newIndex);
});
</script>

<style scoped lang="scss">
.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 14px 24px;
}

.carousel-nav {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.carousel-icon {
  width: 20px;
  height: 20px;
}

.title {
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.ellipsis-container {
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 50px;
  border: 2px solid #adb5bd;
  background-color: transparent;
  width: 100%;
}

.ellipsis-text {
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 25px;
  margin: 20px 14px;
}

.details-container {
  transform: translateY(-30%);
}

.circle-details {
  font-weight: bold;
  height: 28px;
  width: 28px;
  justify-content: center;
  align-items: center;
  color: #adb5bd;
  border: 2px solid #adb5bd;
  border-radius: 50%;
  background-color: white;
  z-index: 2;
  margin-left: auto;
  margin-right: auto;
}

.details {
  color: #adb5bd;
  font-size: 15px;
  font-style: italic;
}

.minus-sign,
.plus-sign {
  padding-bottom: 4px;
}

.content-container {
  min-height: 356px;
  padding: 0 24px 14px 24px;
}

.source {
  font-size: 14px;
  color: #9e9e9e;
}

.content-enter-active,
.content-leave-active {
  transition: opacity 0.5s ease;
}

.content-enter-from,
.content-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-leave-active,
.slide-right-leave-active {
  transition: all 0.4s ease-out;
}

.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
