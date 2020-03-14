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

    <div class="mt-4">
      <games-list></games-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import gamesList from '../components/games-list.vue';

export default {
  components: {
    gamesList
  },

  data() {
    return {
      opponent: '',
      invalid: false
    };
  },

  computed: {
    ...mapState({
      gameId: 'gameId'
    })
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

    ...mapActions({
      startGame: 'startGame',
      setGameState: 'setGameState'
    })
  }
};
</script>
