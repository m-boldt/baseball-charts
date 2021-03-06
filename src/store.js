import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    opponent: '',
    pitchers: [],
    activePitcher: undefined,
    activeHitter: {},
    gameId: '',
    isActive: undefined
  },

  getters: {
    hitters(state) {
      if (state.activePitcher === undefined) {
        return [];
      }

      return state.activePitcher.hitters;
    },

    gameState(state) {
      return {
        gameState: {
          opponent: state.opponent,
          pitchers: state.pitchers
        }
      };
    }
  },

  mutations: {
    setActivePitcher(state, pitcher) {
      state.activePitcher = pitcher;
    },

    setActiveHitter(state, hitter) {
      state.activeHitter = hitter;
    }
  },
  actions: {
    addHitter({ state, dispatch }, hitter) {
      state.activePitcher.hitters.push(hitter);
      dispatch('updateGameState');
    },

    addPitcher({ state, dispatch }, pitcher) {
      if (state.pitchers === undefined) {
        state.pitchers = [];
      }

      state.pitchers.push(pitcher);
      dispatch('updateGameState');
    },

    startGame({ state, getters }, opponentName) {
      state.opponent = opponentName;
      axios.post(
        `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_DATASET}`,
        {
          Active: true,
          ...getters.gameState
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
          }
        }
      );
    },

    addAB({ state, dispatch }, abData) {
      state.activePitcher.atBats.push(abData);
      dispatch('updateGameState');
    },

    async setGameState({ state }, gameId) {
      state.isActive = undefined;

      var url = `${process.env.VUE_APP_API_URL}/${
        process.env.VUE_APP_DATASET
      }/${gameId}`;

      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
          }
        });

        state.gameId = data.id;
        state.isActive = data.Active;
        state.opponent = data.gameState.opponent;
        state.pitchers = data.gameState.pitchers;

        return data.id;
      } catch (e) {
        return '';
      }
    },

    updateGameState({ state, getters }) {
      if (state.pitchers.length === 0 || state.gameId === '') {
        return;
      }

      var url = `${process.env.VUE_APP_API_URL}/${
        process.env.VUE_APP_DATASET
      }/${state.gameId}`;

      axios.put(
        url,
        {
          ...getters.gameState
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
          }
        }
      );
    },

    endGame({ state, getters }) {
      const url = `${process.env.VUE_APP_API_URL}/${
        process.env.VUE_APP_DATASET
      }/${state.gameId}`;

      axios.put(
        url,
        {
          ...getters.gameState,
          Active: false
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
          }
        }
      );

      state.gameId = '';
    },

    async listGames() {
      return axios.get(
        `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_DATASET}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
          }
        }
      );
    }
  }
});
