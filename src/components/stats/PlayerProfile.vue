<template>
  <div>
    <div class="cover">
      <img :src="arrowBackIcon" @click="$router.go(-1) " alt="Go back: teams">

      <img
        class="player-image" 
        :src="pictureBase + player.code + '.png'" 
        alt=""
      >
      <h4>{{player.first_name}}</h4>
      <h3>{{player.web_name}}</h3>
    </div>
    <pre>{{player}}</pre>
  </div>
</template>

<script>
export default {
  name: 'PlayerProfile',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      playerPosition: null,
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p',
      arrowBackIcon: require('@/assets/icons/arrow_back-24px.svg')
    }
  },
  mounted () {
    this.getPlayerPosition()
  },
  methods: {
    getPlayerPosition () {
      switch (this.player.element_type) {
        case 1: return 'gk'
        case 2: return 'def';
        case 3: return 'mid';
        default: return 'fwd';
      }
    }
  }
}
</script>