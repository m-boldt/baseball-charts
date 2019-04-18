<template>
  <div>
    <div class="bg-white rounded px-4 py-4 mt-4 ml-2 mr-2">
      <h3 class="text-grey-dark uppercase text-normal mb-4">
        Select a pitcher
      </h3>
      <p class="text-small text-grey">{{ opponent }}</p>

      <div class="flex px-2 py-2">
        <div class="w-1/6">
          #
        </div>
        <div class="w-2/3">
          Name
        </div>
        <div class="w-1/6">
          Throws
        </div>
      </div>

      <div
        class="bg-grey-dark text-white mb-2 px-2 py-2 rounded flex selectable-row"
        v-for="(pitcher, index) in pitchers"
        :key="pitcher.number + pitcher.name"
        @click="setPitcher(index)"
      >
        <div class="w-1/6">
          {{ pitcher.number }}
        </div>
        <div class="w-2/3">
          {{ pitcher.name }}
        </div>
        <div class="w-1/6 text-center">
          {{ pitcher.throws }}
        </div>
      </div>
    </div>

    <div class="bg-white rounded px-4 py-4 mt-4 ml-2 mr-2">
      <h3 class="text-grey-dark uppercase text-normal mb-4">Add a pitcher</h3>
      <div class="mb-4">
        <label for="pitcher-name" class="block text-grey-dark text-bold mb-2">
          Pitcher
        </label>
        <input
          type="text"
          name="pitcher-name"
          id="pitcher-name"
          v-model="pitcherName"
          class="shadow border w-full px-4 py-2"
          :class="{ 'border border-red': nameInvalid }"
          placeholder="Name of the Pitcher"
        />
      </div>

      <div class="mb-4">
        <label for="pitcher-number" class="block text-grey-dark text-bold mb-2">
          Jersey number
        </label>
        <input
          type="number"
          name="pitcher-number"
          id="pitcher-number"
          v-model="pitcherNumber"
          class="shadow border px-4 py-2"
          :class="{ 'border border-red': numberInvalid }"
          placeholder="#"
        />
      </div>

      <div class="mb-4">
        <label class="block text-grey-dark text-bold mb-2">
          Throws
        </label>
        <input
          type="radio"
          name="pitcher-throws-l"
          id="pitcher-throws-l"
          value="L"
          v-model="throws"
          :class="{ 'border border-red': throwsInvalid }"
        />
        <label for="pitcher-throws-l" class="text-grey-dark ml-1 mr-4">
          L
        </label>

        <input
          type="radio"
          name="pitcher-throws-r"
          id="pitcher-throws-r"
          value="R"
          v-model="throws"
          :class="{ 'border border-red': throwsInvalid }"
        />
        <label for="pitcher-throws-r" class="text-grey-dark ml-1 mr-4">
          R
        </label>
      </div>

      <button
        class="bg-blue hover:bg-blue-dark text-white rounded py-2 px-4 w-full"
        @click="add"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      pitcherName: '',
      throws: '',
      pitcherNumber: '',
      throwsInvalid: false,
      nameInvalid: false,
      numberInvalid: false
    };
  },

  mounted() {
    if (this.gameId === '') {
      this.setGameState();

      if (this.gameId === '') {
        console.log('redirect..');
        this.$router.push('/');
      }
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
      pitchers: 'pitchers',
      gameId: 'gameId'
    })
  },

  methods: {
    add() {
      this.addPitcher({
        name: this.pitcherName,
        number: this.pitcherNumber,
        throws: this.throws,
        hitters: [],
        atBats: []
      });

      this.pitcherName = '';
      this.pitcherNumber = '';
      this.throws = '';
    },

    setPitcher(index) {
      this.setActivePitcher(this.pitchers[index]);
      this.$router.push('hitter');
    },

    ...mapActions({
      addPitcher: 'addPitcher',
      setGameState: 'setGameState'
    }),

    ...mapMutations({
      setActivePitcher: 'setActivePitcher'
    })
  }
};
</script>

<style lang="scss" scoped>
.selectable-row:hover {
  cursor: pointer;
}
</style>
