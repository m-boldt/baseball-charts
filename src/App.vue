<template>
  <div id="app">
    <nav class="bg-white px-4 py-4 clearfix">
      <div class="float-left text-xs text-grey">
        {{ gameId }}
      </div>
<<<<<<< HEAD
      <button
        v-if="gameId != ''"
        class="float-right bg-grey-dark text-white mb-2 px-2 py-2 rounded"
        @click="endGameHandler"
      >
        End game
      </button>
=======
      <a href="#" class="float-right">
        <font-awesome-icon icon="bars" />
      </a>
>>>>>>> parent of fe23222... implement end game button
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
