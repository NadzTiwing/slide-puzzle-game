<script>
import Card from '../components/Card.vue';
import { env } from './../const/index.js';


export default {
  name: 'Playground',
  data() {
    return {
      heroes: [],
      selected: {
        id: 0,
        name: 'No Hero Selected',
        image: '',
        combat: 0,
        durability: 0,
        intelligence: 0,
        power: 0,
        speed: 0,
        strength: 0
      },
      villain: {
        id: 0,
        name: '???',
        image: ''
      }
    }
  },
  components: {
    Card
  },
  methods: {
    async getSelectedHeroes() {
      const results = await fetch(`${env.VITE_DB_URL}/heroes`, {
        method: 'GET'
      });

      const data = await results.json();
      return data;
    },
    selectHero(id) {
      this.heroes[0].map(hero => {
        if(hero.id === id) {
          this.selected.id = id;
          this.selected.name = hero.name;
          this.selected.image = hero.image;
          this.selected.combat = hero.combat,
          this.selected.durability = hero.durability,
          this.selected.intelligence = hero.intelligence,
          this.selected.power = hero.power,
          this.selected.speed = hero.speed,
          this.selected.strength = hero.strength

          return this.selected;
        }
      });
    },
    isHeroStatGreater(heroStat, villainStat) {
      if(heroStat > villainStat) return true;
      return false;
    },
    async fight() {
      const results = await fetch(`${env.VITE_VILLAINS_API_URL}`, {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': env.VITE_API_KEY,
              'X-RapidAPI-Host': env.VITE_HOST
          }
      });

      const villains = await results.json();
      const randomId = Math.floor(Math.random() * 20);
      const villain = villains[randomId];
      
      this.villain.name = villain.name;
      this.villain.image = villain.images.sm;

      let heroPts = 0;

      if(this.selected.combat > villain.powerstats.combat) heroPts++;
      if(this.selected.durability > villain.powerstats.durability) heroPts++;
      if(this.selected.intelligence > villain.powerstats.intelligence) heroPts++;
      if(this.selected.power > villain.powerstats.power) heroPts++;
      if(this.selected.speed > villain.powerstats.speed) heroPts++;
      if(this.selected.strength > villain.powerstats.strength) heroPts++;

      let enemyPts = 6 - heroPts;
      console.log({you: heroPts, enemy: enemyPts});
      if(heroPts > enemyPts) alert('You Win!');
      else if(heroPts == enemyPts) alert('It is a draw.');
      else alert('You lose!');
    }
  },
  async created() {
    this.heroes = await this.getSelectedHeroes();
  },
  mounted() {
    //console.log(this.heroes);
  }  
}
</script>

<template>
  <main class="playground">
    <div class="main-card">
      <h2 class="user">You</h2>
      <Card
      :hero-name = "this.selected.name"
      :hero-img = "this.selected.image"
      />
    </div>
    <button class="go-btn" @click="fight()">GO!</button>
    <div class="enemy-card">
      <h2 class="user">Enemy</h2>
      <Card
      :hero-name = "this.villain.name"
      :hero-img = "this.villain.image"
      />
    </div>
  </main>
  <hr/>
  
  <footer class="card-selection">
    <Card
      v-for = "hero in heroes[0]"
      :key = "hero.id"
      :hero-name = "hero.name"
      :hero-img = "hero.image"
      @select-hero="selectHero(hero.id)"
    />
    
  </footer>
</template>