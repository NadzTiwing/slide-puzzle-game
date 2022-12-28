<script>
export default {
    name: 'Card',
    props: {
        heroId: Number,
        heroName: String,
        heroImg: String
    },
    mounted() {
        //console.log(this.$props);
    }
}



</script>

<template>
    <div class="card" @click="$emit('select-hero', heroId)">
        <img 
        :src="[heroImg || '/logo.svg']"
        alt="card-img"/>
        <div class="gradient-overlay"></div>
        <h4>{{ $props.heroName }}</h4>
    </div>
</template>