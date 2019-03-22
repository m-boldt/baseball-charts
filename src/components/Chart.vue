<template>
  <div class="px-2 py-4">
    <div class="bg-white rounded px-4 py-4">
      <h3 class="text-grey-dark uppercase text-normal mb-4">
        #{{ activeHitter.number }} {{ activeHitter.name }}
      </h3>

      <h4>Pitches</h4>
      <div class="flex flex-row">
        <div class="flex flex-col">
          <div class="pitches-box no-border label">B</div>
          <div class="pitches-box no-border label">K</div>
        </div>
        <div
          class="flex flex-col"
          v-for="(pitch, index) in pitches"
          :key="'Pitch_' + index"
        >
          <div
            class="pitches-box"
            :class="[
              { marked: pitch.strike === '0' },
              getPitchClass(pitch.swing, pitch.strike === '0')
            ]"
          >
            <template v-if="pitch.strike === '0'">{{ pitch.type }}</template>
          </div>
          <div
            class="pitches-box"
            :class="[
              { marked: pitch.strike === '1' },
              getPitchClass(pitch.swing, pitch.strike === '1')
            ]"
          >
            <template v-if="pitch.strike === '1'">{{ pitch.type }}</template>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded px-4 py-4">
      <h4>Chart pitches</h4>

      <div class="mt-2">
        <label class="block text-grey-dark text-bold mb-2">
          Pitch
        </label>

        <div class="flex">
          <div class="w-1/3">
            <input
              type="radio"
              name="pitch-type"
              id="pitch-fb"
              value="FB"
              v-model="pitchType"
            />
            <label for="pitch-fb" class="text-grey-dark ml-1 mr-4">
              FB
            </label>
          </div>

          <div class="w-1/3">
            <input
              type="radio"
              name="pitch-type"
              id="pitch-cb"
              value="CB"
              v-model="pitchType"
            />
            <label for="pitch-cb" class="text-grey-dark ml-1 mr-4">
              CB
            </label>
          </div>

          <div class="w-1/3">
            <input
              type="radio"
              name="pitch-type"
              id="pitch-sl"
              value="SL"
              v-model="pitchType"
            />
            <label for="pitch-sl" class="text-grey-dark ml-1 mr-4">
              SL
            </label>
          </div>
        </div>

        <div class="flex">
          <div class="w-1/3">
            <input
              type="radio"
              name="pitch-type"
              id="pitch-cut"
              value="CUT"
              v-model="pitchType"
            />
            <label for="pitch-cut" class="text-grey-dark ml-1 mr-4">
              CUT
            </label>
          </div>

          <div class="w-1/3">
            <input
              type="radio"
              name="pitch-type"
              id="pitch-ch"
              value="CH"
              v-model="pitchType"
            />
            <label for="pitch-ch" class="text-grey-dark ml-1 mr-4">
              CH
            </label>
          </div>

          <div class="w-1/3">
            <input
              type="radio"
              name="pitch-type"
              id="pitch-splt"
              value="SPLT"
              v-model="pitchType"
            />
            <label for="pitch-splt" class="text-grey-dark ml-1 mr-4">
              SPLT
            </label>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-grey-dark text-bold mb-2">
          Ball/Strike
        </label>

        <div class="flex">
          <div class="w-1/3">
            <input
              type="radio"
              name="ball"
              id="ball"
              value="0"
              v-model="strike"
            />
            <label for="ball" class="text-grey-dark ml-1 mr-4">
              Ball
            </label>
          </div>

          <div class="w-1/3">
            <input
              type="radio"
              name="strike"
              id="strike"
              value="1"
              v-model="strike"
            />
            <label for="strike" class="text-grey-dark ml-1 mr-4">
              Strike
            </label>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-grey-dark text-bold mb-2">
          Swing
        </label>

        <div class="flex">
          <div class="w-1/3">
            <input
              type="radio"
              name="looking"
              id="looking"
              value="0"
              v-model="swing"
            />
            <label for="looking" class="text-grey-dark ml-1 mr-4">
              Looking
            </label>
          </div>

          <div class="w-2/3">
            <input
              type="radio"
              name="swingAndMiss"
              id="swingAndMiss"
              value="1"
              v-model="swing"
            />
            <label for="swingAndMiss" class="text-grey-dark ml-1 mr-4">
              Swing and miss
            </label>
          </div>
        </div>
        <div class="flex">
          <div class="w-1/3">
            <input
              type="radio"
              name="fouldBall"
              id="foulBall"
              value="2"
              v-model="swing"
            />
            <label for="foulBall" class="text-grey-dark ml-1 mr-4">
              Foul Ball
            </label>
          </div>

          <div class="w-2/3">
            <input
              type="radio"
              name="putInPlay"
              id="putInPlay"
              value="3"
              v-model="swing"
            />
            <label for="putInPlay" class="text-grey-dark ml-1 mr-4">
              Put in play
            </label>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <button
          class="bg-white hover:bg-grey-lightest border rounded border-grey py-2 px-4 mt-2 w-full text-center block"
          @click="addPitch"
        >
          Add Pitch
        </button>
      </div>

      <div class="mt-4">
        <label for="result" class="block text-grey-dark text-bold mb-2">
          Result
        </label>
        <select
          type="text"
          name="result"
          id="result"
          v-model="result"
          class="shadow border w-full px-4 py-2"
        >
          <option value="">Select the result</option>
          <optgroup label="Out">
            <option value="1">K</option>
            <option value="2">Groundout</option>
            <option value="3">Flyout</option>
          </optgroup>
          <optgroup label="On Base">
            <option value="4">BB</option>
            <option value="5">HBP</option>
            <option value="6">1B</option>
            <option value="7">2B</option>
            <option value="8">3B</option>
            <option value="9">HR</option>
          </optgroup>
        </select>
      </div>

      <div class="mt-4">
        <button
          class="bg-blue hover:bg-blue-dark text-white rounded py-2 px-4 w-full"
          @click="finalizeAB"
        >
          Finalize
        </button>
      </div>
    </div>

    <router-link
      to="/hitter"
      class="bg-white hover:bg-grey-lightest bordered rounded border-grey py-2 px-4 mt-2 w-full text-center block"
    >
      Back
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      pitchType: '',
      strike: '',
      swing: '',
      result: '',
      pitches: []
    };
  },

  computed: {
    ...mapState({
      opponent: 'opponent',
      activeHitter: 'activeHitter',
      activePitcher: 'activePitcher',
      gameId: 'gameId'
    })
  },

  mounted() {
    if (this.gameId === '') {
      this.setGameState();
    }

    if (Object.entries(this.activePitcher).length === 0 && this.activePitcher.constructor === Object) {
      this.$router.push('pitcher');
    }

    if (Object.entries(this.activeHitter).length === 0 && this.activeHitter.constructor === Object) {
      this.$router.push('hitter');
    }
  },

  watch: {
    gameId() {
      if (this.gameId === '') {
        this.$router.push('');
      }
    },

    strike() {
      if (this.strike === '0') {
        this.swing = '0';
      }
    }
  },

  methods: {
    addPitch() {
      if (this.pitchType === '' || this.strike === '') {
        return;
      }

      this.pitches.push({
        type: this.pitchType,
        strike: this.strike,
        swing: this.swing
      });

      this.pitchType = '';
      this.strike = '';
      this.swing = '';
    },

    getPitchClass(swing, isActive) {
      if (!isActive) {
        return '';
      }

      if (swing === '0') {
        return 'looking';
      } else if (swing === '1') {
        return 'swingAndMiss';
      } else if (swing === '2') {
        return 'foulBall';
      } else if (swing === '3') {
        return 'inPlay';
      }
    },

    finalizeAB() {
      this.addPitch();

      if (this.pitches.length > 0 && this.result !== '') {
        this.addAB({
          hitterName: this.activeHitter.name,
          hitterNumber: this.activeHitter.number,
          hitterBats: this.activeHitter.bats,
          result: this.result,
          pitches: this.pitches
        });

        this.$router.push('hitter');
      }
    },

    ...mapActions({
      addAB: 'addAB',
      setGameState: 'setGameState'
    })
  }
};
</script>

<style lang="scss" scoped>
.pitches-box {
  padding: 0;
  border: 1px solid #ccc;
  margin-top: 5px;
  margin-right: 5px;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 9px;

  &.label {
    width: 30px;
    font-size: 16px;
  }

  &.no-border {
    border: none;
  }

  &.marked {
    background-color: #ccc;

    &.swingAndMiss {
      background-color: #ffc;
    }

    &.foulBall {
      background-color: #fc6;
    }

    &.inPlay {
      background-color: #f96;
    }
  }
}
</style>
