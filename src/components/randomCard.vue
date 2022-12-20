<script>
const env = import.meta.env;
export default {
    name: 'randomCard',
    data() {
        return {
            heroes: [],
            selectedHeroes: []
        }
    },
    methods: {
        async getRandomHeroes() {
            //return 20 random superheroes
            const results = await fetch(env.VITE_SUPERHEROES_API_URL, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': env.VITE_API_KEY,
                    'X-RapidAPI-Host': env.VITE_HOST
                }
            });

            const data = await results.json();
            const primaryData = data.map((hero) => ({
                id: hero.id, 
                name: hero.name, 
                isSelected: false,
                combat: hero.powerstats.combat,
                durability: hero.powerstats.durability,
                intelligence: hero.powerstats.intelligence,
                power: hero.powerstats.power,
                speed: hero.powerstats.speed,
                strength: hero.powerstats.strength
            }));
            
            return primaryData;
        },
        async getSelectedHeroes() {
            const results = await fetch(`${env.VITE_DB_URL}/heroes`, {
                method: 'GET'
            });
            const data = await results.json();

            return data;
        },
        async onSelected(id) {
            this.heroes = this.heroes.map((hero) => {
                if(hero.id === id) hero.isSelected = !hero.isSelected;
                return hero;
            });
        },
        async play() {
            let selected = [];
            this.heroes = this.heroes.forEach((hero) => {
                if(hero.isSelected) {
                    let data = { 
                        id: hero.id, 
                        name: hero.name, 
                        combat: hero.combat,
                        durability: hero.durability,
                        intelligence: hero.intelligence,
                        power: hero.power,
                        speed: hero.speed,
                        strength: hero.strength
                    };
                    selected.push(data);
                }
            });

            if(selected.length > 5) {
                alert("Please select up to Five cards only.");
                return;
            }
            const response = await fetch(`${env.VITE_DB_URL}/heroes`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(selected)
            });

            const result = await response.json();

            this.selectedHeroes = [...this.selectedHeroes, result];
            this.$router.push('/play');
        }
    },
    async created() {
        this.heroes = await this.getRandomHeroes();
    }

}
</script>

<template>
    <h1>Select Five (5) Cards Before Playing.</h1>
    <div class="card-container">
        <img 
            src="./../assets/logo.svg"
            width="100"
            height="100"
            :key="hero.id" 
            v-for="hero in heroes"
            class="random-card"
            @click="onSelected(hero.id)"
            :data-status="[hero.isSelected ? 'selected' : 'unselected']"
        />
    </div>
    <button class="btn btn-play" @click="play()">PLAY</button>
</template>