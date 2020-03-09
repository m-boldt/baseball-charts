<template>
  <div id="app">
    <nav class="bg-white px-4 py-4 clearfix">
      <div class="float-left text-xs text-grey">
        <div>
          <router-link to="/">
            <button class="bg-grey-dark text-white mb-2 px-2 py-2 rounded">
              Home
            </button>
          </router-link>
        </div>

        {{ gameId }}
      </div>
      <button
        v-if="gameId != ''"
        class="float-right bg-grey-dark text-white mb-2 px-2 py-2 rounded"
        @click="endGameHandler"
      >
        End game
      </button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      gameId: 'gameId'
    })
  },

  methods: {
    ...mapActions({
      endGame: 'endGame'
    }),
    endGameHandler() {
      this.endGame();
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #666;
}
</style>
