<script setup lang="ts">
import { snap } from "@/utils/snap";

const formState = reactive({ scale: 1 })
const stageSize = computed((scale = formState.scale) => ({ x: 1000 * scale, y: 1000 * scale }))

const targetPoints = [
  { x: 100, y: 200 },
  { x: 300, y: 300 },
  { x: 400, y: 400 },
  { x: 100, y: 500 },
];

const position = reactive({ x: 0, y: 0 });

const snapControl = snap({ targetPoints, classNames: { container: 'transform-container', item: 'transform-item' } })
snapControl.hooks.onTranslate = ({ dx, dy }) => {
  // console.log({ dx, dy });
  position.x += dx;
  position.y += dy;
}
</script>

<template>
  <!-- scale -->
  <div class="flex mb-2">
    <a-form :model="formState" layout="inline">
      <a-form-item label="scale" name="scale">
        <a-input-number min="1" v-model:value="formState.scale" @change="snapControl.onContainerScale" />
      </a-form-item>
    </a-form>
  </div>
  <!-- stage -->
  <svg :class="[snapControl.classNames.container, 'border border-black']" stroke="black" :width="stageSize.x"
    :height="stageSize.y">
    <g :transform="`scale(${formState.scale})`">
      <!-- indicating points -->
      <g class="points" fill="yellow" stroke="black">
        <!-- expended points -->
        <g>
          <circle :cx="point.x" :cy="point.y" :r="10 / formState.scale" v-for="point of targetPoints"></circle>
        </g>
        <g fill="red">
          <circle :cx="point.x" :cy="point.y" :r="10 / formState.scale" v-for="point of snapControl.expandedPoints">
          </circle>
        </g>
      </g>
      <!-- drag -->
      <g :class="[snapControl.classNames.item]">
        <rect width="200" height="100" fill="green" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
        </rect>
      </g>
    </g>
  </svg>
</template>