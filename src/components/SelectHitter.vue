<template>
  <div class="px-2 py-4">
    <div class="bg-white rounded px-4 py-4">
      <h3 class="text-grey-dark uppercase text-normal mb-4">
        {{ activePitcher.name }}
      </h3>
      <div class="flex">
        <div class="w-1/2">{{ activePitcher | calculateAtBats }} Hitter</div>
        <div class="w-1/2">{{ activePitcher | calculatePitches }} Pitches</div>
      </div>
      <div class="flex">
        <div class="w-1/2">{{ activePitcher | calculateStrikes }} Strikes</div>
        <div class="w-1/2">{{ activePitcher | calculateBalls }} Balls</div>
      </div>
    </div>

    <div class="bg-white rounded px-4 py-4 mt-2">
      <h3 class="text-grey-dark uppercase text-normal mb-4">Select a hitter</h3>
      <p class="text-small text-grey">{{ opponent }}</p>

      <div class="flex px-2 py-2">
        <div class="w-1/6">
          #
        </div>
        <div class="w-2/3">
          Name
        </div>
        <div class="w-1/6">
          Bats
        </div>
      </div>

      <div
        class="bg-grey-dark text-white mb-2 px-2 py-2 rounded flex selectable-row"
        v-for="(hitter, index) in hitters"
        :key="hitter.number + hitter.name"
        @click="selectHitter(index)"
      >
        <div class="w-1/6">
          {{ hitter.number }}
        </div>
        <div class="w-2/3">
          {{ hitter.name }}
        </div>
        <div class="w-1/6">
          {{ hitter.bats }}
        </div>
      </div>
    </div>

    <div class="bg-white rounded px-4 py-4 mt-2">
      <h3 class="text-grey-dark uppercase text-normal mb-4">Add a hitter</h3>
      <div class="mb-4">
        <label for="hitter-name" class="block text-grey-dark text-bold mb-2">
          Hitter
        </label>
        <input
          type="text"
          name="hitter-name"
          id="hitter-name"
          v-model="hitterName"
          class="shadow border w-full px-4 py-2"
          :class="{ 'border border-red': nameInvalid }"
          placeholder="Name of the hitter"
        />
      </div>

      <div class="mb-4">
        <label for="hitter-number" class="block text-grey-dark text-bold mb-2">
          Jersey number
        </label>
        <input
          type="number"
          name="hitter-number"
          id="hitter-number"
          v-model="hitterNumber"
          class="shadow border px-4 py-2"
          :class="{ 'border border-red': numberInvalid }"
          placeholder="#"
        />
      </div>

      <div class="mb-4">
        <label class="block text-grey-dark text-bold mb-2">
          Bats
        </label>
        <input
          type="radio"
          name="hitter-bats-l"
          id="hitter-bats-l"
          value="L"
          v-model="hitterBats"
          :class="{ 'border border-red': batsInvalid }"
        />
        <label for="hitter-bats-l" class="text-grey-dark ml-1 mr-4">
          L
        </label>

        <input
          type="radio"
          name="hitter-bats-r"
          id="hitter-bats-r"
          value="R"
          v-model="hitterBats"
          :class="{ 'border border-red': batsInvalid }"
        />
        <label for="hitter-bats-r" class="text-grey-dark ml-1 mr-4">
          R
        </label>

        <input
          type="radio"
          name="hitter-bats-s"
          id="hitter-bats-s"
          value="S"
          v-model="hitterBats"
          :class="{ 'border border-red': batsInvalid }"
        />
        <label for="hitter-bats-s" class="text-grey-dark ml-1 mr-4">
          S
        </label>
      </div>

      <button
        class="bg-blue hover:bg-blue-dark text-white rounded py-2 px-4 w-full"
        @click="add"
      >
        Add
      </button>
    </div>

    <router-link
      to="/pitcher"
      class="bg-white hover:bg-grey-lightest bordered rounded border-grey py-2 px-4 mt-2 w-full text-center block"
    >
      Back
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      hitterName: '',
      hitterBats: '',
      hitterNumber: '',
      batsInvalid: false,
      nameInvalid: false,
      numberInvalid: false
    };
  },

  mounted() {
    if (this.gameId === '') {
      this.setGameState();
    }

    if (Object.entries(this.activePitcher).length === 0 && this.activePitcher.constructor === Object) {
      this.$router.push('pitcher');
    }
  },

  watch: {
    gameId() {
      if (this.gameId === '') {
        this.$router.push('');
      }
    }
  },

  computed: {
    ...mapState({
      opponent: 'opponent',
      activePitcher: 'activePitcher',
      gameId: 'gameId'
    }),

    ...mapGetters({
      hitters: 'hitters'
    })
  },

  methods: {
    add() {
      this.addHitter({
        name: this.hitterName,
        number: this.hitterNumber,
        bats: this.hitterBats
      });

      this.hitterName = '';
      this.hitterNumber = '';
      this.hitterBats = '';
    },

    ...mapActions({
      addHitter: 'addHitter',
      setGameState: 'setGameState'
    }),

    ...mapMutations({
      setActiveHitter: 'setActiveHitter'
    }),

    selectHitter(index) {
      this.setActiveHitter(this.hitters[index]);
      this.$router.push('chart');
    }
  }
};
</script>

<style lang="scss" scoped>
.selectable-row:hover {
  cursor: pointer;
}
</style>
