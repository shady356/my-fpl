<template>
  <div>
    <Header>
      <template #title>
        <h3>About</h3>
      </template> 
    </Header>
    <div class="about-container default-page-margin">
      <h1>About</h1>
      <p>
        This is a Fantasy Premier League (FPL) web-application for displaying a given player's score throughout the gameweeks. 
        The data is fetched by Fantasy Premier League's official API. 
      </p>
      <h2>How do I use it?</h2>
      <p>
        Assuming that you already have a FPL-profile – You can simply enter your <i>team id</i> at the home screen,
        and the application will gather the data based on your team.
      </p> 
      <h2>Site navigation</h2>
      <h6>Home</h6>
      <h6>Stats</h6>
      <h6>About</h6>
      
      <h2>API Endpoints</h2>
      <p>
        Base URL: <pre>https://fantasy.premierleague.com/</pre>
      </p>
      <h3>List of endpoints</h3>
      <ul class="endpoints">
        <li>
          <pre>BASE_URL/api/bootstrap-static/</pre>
        </li>
        <li>
          <pre>BASE_URL/api/entry/${teamId}/event/${gw}/picks/</pre>
        </li>
        <li>
          <pre>BASE_URL/api/entry/${teamId}/history/</pre>
        </li>
        <li>
          <pre>BASE_URL/api/element-summary/${playerId}/</pre>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
export default {
  name: 'About',
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
.about-container {

  h1 {
    color: #fff;
  }
  h2 {
    margin: 1.5rem 0 1rem;
    color: #ddd;
  }
  h3 {
    margin: 1.5rem 0 1rem;
  }
  h6 {
    margin: 1.5rem 0 1rem;
  }
  pre {
    background: #0a0a0a;
    border-left: 2px solid $pl-blue;
    padding: $xs $s;
    margin: $xs 0;
  }
  .endpoints {
    overflow-x: scroll;
    width: 85vw;
    li {
      margin: $s 0;
    }
  }
  p {
    margin: $m 0;
    line-height: 1.35rem;
  }
}

.light {
  h1,h2,h3,h4,h5,h6 {
    color: initial;
  }
  pre {
    background: #ddd;
    color: initial;
  }
}
</style>