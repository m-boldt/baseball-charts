<template>
  <div>
    <h3 class="text-grey-dark uppercase text-normal mb-4">Previous Games</h3>

    <div
      class="flex flex-wrap bg-grey-dark text-white px-2 py-2 mb-2 font-bold"
    >
      <div class="w-full sm:w-1/6">
        Date
      </div>
      <div class="w-full sm:w-1/2">
        Opponent
      </div>
    </div>

    <div
      v-for="game in games"
      :key="`game_${game.id}`"
      class="flex flex-wrap bg-grey text-white px-2 py-2 mb-2 game-list-item"
      :class="{ 'bg-blue': game.active }"
      @click="gotoGame(game.id, game.active)"
    >
      <div class="w-full sm:w-1/6">
        {{ game.createdAt | formatDate }}
      </div>
      <div class="w-full sm:w-1/2">
        {{ game.opponent }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    games: []
  }),

  async mounted() {
    const data = await this.listGames();
    this.games = data;
  },

  methods: {
    ...mapActions({
      listGames: 'listGames'
    }),

    gotoGame(id, gameActive) {
      var route = 'pitcher';
      if (!gameActive) {
        route = 'summary';
      }

      this.$router.push({ name: route, params: { id: id } });
    }
  },

  filters: {
    formatDate(date) {
      let dt = new Date(date);
      return `${dt.toLocaleDateString('en-US')}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.game-list-item.bg-blue:hover {
  cursor: pointer;
}
</style>
