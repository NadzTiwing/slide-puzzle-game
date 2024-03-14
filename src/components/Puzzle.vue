<script setup lang="ts">
import { ref } from "vue";

const moves = ref(0);
const result = ref("");
const currentElement = ref("");
const movesCount = ref([]);
const imagesArr = ref([]);

// randomize the order of the images in the puzzle
const randomNumber = () => Math.floor(Math.random() * 8 ) + 1;
const getCoordinates = (element) => {
  // const [row, col] = 
};

// checks two pieces are adjacent to each other
const checkAdjacent = (row1, row2, col1, col2) => {
  if (row1 == row2) {
    // left/right
    if (col2 == col1 -1 || col2 == col1 + 1) {
      return true;
    } else if (col1 == col2) {
      // up/down
      if(row2 == row1 - 1 || row2 == row1 + 1) {
        return true;
      }
    }

    return false;
  }
};

const randomImages = () => {
  while (imagesArr.length < 8) {
    let randomVal = randomNumber();
    if (!imagesArr.includes(randomVal)) {
      imagesArr.push(randomVal);
    }
  }
  imagesArr.push(9);
};


</script>

<template>
    <main>
      <span id="moves">0</span>
      <div class="slider-game">
        <div class="container">
        </div>
        <div class="original-image">
          <img src="https://groundtutorial.com/wp-content/uploads/2024/01/original_image.png" alt="puzzle-picture" />
        </div>
      </div>
    </main>
</template>