<script setup lang="ts">
import Puzzle from './components/Puzzle.vue';
import { ref } from "vue";

const isVisible = ref(true);
const isStart = ref(false);
const start = () => {
  isVisible.value = false;
  isStart.value = true;
}; 
</script>

<template>
  <button class="start-btn" @click="start" v-show="isVisible">Start Game</button>
  <main v-show="isStart">
    <Puzzle />
  </main>
</template>

<style scoped>
.start-btn {
  display: flex;
  place-content: center;
  padding: 1rem 2rem;
  background-color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  margin: 40vh auto;
  border: 1px solid lightgreen;
  border-radius: 50px;
}

.start-btn:hover {
  background-color: lightgreen;
  color: white;
}
</style>
