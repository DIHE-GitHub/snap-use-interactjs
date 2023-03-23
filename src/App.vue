<script setup lang="ts">
import { EFitType, fitContainerScale } from "@/utils/snap";
import interact from "interactjs";

const scale = 2;
const targetPoints = [
  { x: 300, y: 300 },
  { x: 400, y: 400 },
];
const position = { x: 0, y: 0 };
const customSnapMod = interact.modifiers.snap({
  targets: [...targetPoints.map(fitContainerScale(EFitType.Point, scale))],
  range: 50,
  offset: "parent",
  relativePoints: [
    { x: 0, y: 0 }, // snap relative to the element's top-left,
    { x: 0.5, y: 0.5 }, // to the center
    { x: 1, y: 0 },
    { x: 1, y: 1 }, // and to the bottom-right
    { x: 0, y: 1 },
  ],
});

interact(".drag").draggable({
  modifiers: [customSnapMod],
  listeners: {
    move(event) {
      let { dx, dy } = event;
      ({ x: dx, y: dy } = fitContainerScale(
        EFitType.Mouse,
        scale
      )({ x: dx, y: dy }));
      position.x += dx;
      position.y += dy;

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  },
});

</script>

<template>
  <svg class="container">
    <g transform="scale(2)">
      <!-- placehold -->
      <rect width="500px" height="500px" fill="white"></rect>
      <!-- Indicating points -->
      <g class="points" fill="yellow">
        <circle cx="300" cy="300" r="10"></circle>
        <circle cx="400" cy="400" r="10"></circle>
      </g>
      <!-- drag -->
      <g class="drag">
        <rect width="200" height="100" fill="green" class="drag1"></rect>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.container {
  border: 1px solid black;
  width: 100%;
  height: 100vh;
}

.drag {
  position: absolute;
  left: 350px;
  top: 350px;
  width: 200px;
  height: 100px;
  background-color: #34b657;
  fill: #34b657;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 26px;
  /* transform: rotate(30deg); */
  user-select: none;
}
</style>
