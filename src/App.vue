<template>
  <div id="app">
    <nav class="bg-white px-4 py-4 clearfix">
      <div class="float-left text-xs text-grey">
        {{ gameId }}
      </div>
      <a href="#" class="float-right">
        <font-awesome-icon icon="bars" />
      </a>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      gameId: 'gameId'
    })
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #666;
}
</style>
