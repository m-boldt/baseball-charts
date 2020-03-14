<template>
  <div>
    <div class="bg-white rounded px-4 py-4 mt-4 ml-2 mr-2">
      <h3 class="text-grey-dark uppercase text-normal mb-4">
        Game summary
      </h3>

      <p class="text-small text-grey">vs. {{ opponent }}</p>

      <h4 class="text-grey-dark text-normal mb-4 mt-4">
        Pitchers
      </h4>

      <div
        v-for="(pitcher, index) in pitchers"
        :key="`pitcher_${index}`"
        class="mb-4"
      >
        <strong>{{ pitcher.name }}</strong>

        <div class="flex flex-wrap mb-2">
          <div class="w-1/2 md:w-1/3">
            {{ pitcher | calculatePitches }} pitches
          </div>

          <div class="w-1/2 md:w-1/3">
            {{ pitcher | calculateStrikes }} strikes
          </div>

          <div class="w-1/2 md:w-1/3">{{ pitcher | calculateBalls }} balls</div>
        </div>

        <div class="flex flex-wrap mb-2">
          <div class="w-1/2 md:w-1/3">
            {{ pitcher | calculateAtBats }} hitters
          </div>

          <div class="w-1/2 md:w-1/3">{{ pitcher | calculateOuts }} outs</div>

          <div class="w-1/2 md:w-1/3">
            {{ pitcher | calculateOnBase }} on base
          </div>
        </div>

        <div class="flex flex-wrap mb-2">
          <div class="w-1/2 md:w-1/3 ml-auto">
            {{ pitcher | calculateStrikeouts }} strikeouts
          </div>

          <div class="w-1/2 md:w-1/3">
            {{ pitcher | calculateWalks }} base on balls
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      opponent: 'opponent',
      pitchers: 'pitchers',
      gameId: 'gameId'
    })
  },

  mounted() {
    const id = this.$route.params.id;
    if (id === null || id === undefined) {
      this.$router.push({ name: 'startGame' });
    }

    this.setGameState(id);
  },

  methods: {
    ...mapActions({
      setGameState: 'setGameState'
    })
  }
};
</script>
