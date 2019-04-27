<template>
  <div class="bg-white rounded px-8 py-8 mt-4 ml-2 mr-2">
    <h3 class="text-grey-dark uppercase text-normal mb-4">Create a new game</h3>

    <div
      class="bg-red-lightest text-red-dark border border-red-light rounded py-4 px-4 mb-2"
      v-if="invalid"
    >
      The opponent is missing
    </div>
    <div class="mb-2">
      <label for="opponent" class="block text-grey-dark text-bold mb-2">
        Opponent
      </label>
      <input
        type="text"
        name="opponent"
        id="opponent"
        v-model="opponent"
        class="shadow border w-full px-4 py-2"
        :class="{ 'border border-red': invalid }"
        placeholder="Enter the opponent"
      />
    </div>
    <div class="text-right">
      <button
        @click="submit"
        class="bg-blue text-white rounded py-2 px-4 hover:bg-blue-dark"
      >
        Continue
      </button>
    </div>

    <h3 class="text-grey-dark uppercase text-normal mb-4">Previous games</h3>
    <div>
      <i v-if="previousGames.length === 0">No previous games available</i>
      <div
        class="flex mb-2 py-4 px-4 bg-grey-light"
        v-for="game in previousGames"
        :key="game.id"
      >
        <div class="w-1/5">{{ game.date }}</div>
        <div class="w-1/2">{{ game.opponent }}</div>
        <div class="w-2/5">{{ numPitchers(game) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      opponent: '',
      invalid: false
    };
  },

  mounted() {
    if (this.gameId === '') {
      this.setGameState();
    } else {
      this.$router.push('pitcher');
    }

    if (this.previousGames.length === 0) {
      this.getPreviousGames();
    }
  },

  computed: {
    ...mapState({
      gameId: 'gameId',
      previousGames: 'previousGames'
    })
  },

  watch: {
    gameId() {
      if (this.gameId !== '') {
        this.$router.push('pitcher');
      }
    }
  },

  methods: {
    submit() {
      if (this.opponent.trim() === '') {
        this.invalid = true;
      } else {
        this.invalid = false;
        this.startGame(this.opponent);
        this.$router.push('pitcher');
      }
    },

    numPitchers(game) {
      if (game.pitchers != undefined) {
        if (game.pitchers.length <= 1) {
          return `${game.pitchers.length} pitcher`;
        } else {
          return `${game.pitchers.length} pitchers`;
        }
      }

      return '0 pitchers';
    },

    ...mapActions({
      startGame: 'startGame',
      setGameState: 'setGameState',
      getPreviousGames: 'getPreviousGames'
    })
  }
};
</script>
