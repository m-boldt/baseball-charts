import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    opponent: '',
    pitchers: [],
    activePitcher: {},
    activeHitter: {},
    id: ''
  },

  getters: {
    hitters(state) {
      return state.activePitcher.hitters;
    },

    gameState(state) {
      return {
        "gameState": {
          "opponent": state.opponent,
          "pitchers": state.pitchers
        }
      };
    },

    gameId(state) {
      if (state.id === '' && localStorage.getItem('gameId') !== null) {
        state.id = localStorage.getItem('gameId');
      }

      return state.id;
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
      axios.post('https://hr-freeware.info/charts', {
        Active: true,
        ...getters.gameState,
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1MzE5MzU3NSwiZXhwIjoxNTU1Nzg1NTc1fQ.wiNVgDPjeTusLQKqWAkuYe0-0MZYvhDko2IGqocD3VM'
        }
      })
      .then(function() {
        location.reload();
      });
    },

    addAB({ state, dispatch }, abData) {
      state.activePitcher.atBats.push(abData);
      dispatch('updateGameState');
    },
    setGameState({ state }) {
      axios.get('https://hr-freeware.info/charts?Active=true&_limit=1', {
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1MzE5MzU3NSwiZXhwIjoxNTU1Nzg1NTc1fQ.wiNVgDPjeTusLQKqWAkuYe0-0MZYvhDko2IGqocD3VM'
        }
      })
      .then(response => {
        if (response.data.length > 0) {
          var item = response.data[0];
          localStorage.setItem('gameId', response.data[0].id);
          state.id = response.data[0].id;

          console.log(item);

          state.opponent = item.gameState.opponent;
          state.pitchers = item.gameState.pitchers;
        }
      });
    },

    updateGameState({ state, getters }) {
      if (state.pitchers.length === 0 || getters.gameId === '') {
        return;
      }

      axios.put(`https://hr-freeware.info/charts/${getters.gameId}`, {
        ...getters.gameState,
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1MzE5MzU3NSwiZXhwIjoxNTU1Nzg1NTc1fQ.wiNVgDPjeTusLQKqWAkuYe0-0MZYvhDko2IGqocD3VM'
        }
      });
    },

    endGame({ getters }) {
      localStorage.setItem('gameId', '');
      axios.put(`https://hr-freeware.info/charts/${getters.gameId}`, {
        ...getters.gameState,
        Active: false,
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1MzE5MzU3NSwiZXhwIjoxNTU1Nzg1NTc1fQ.wiNVgDPjeTusLQKqWAkuYe0-0MZYvhDko2IGqocD3VM'
        }
      }).then(() => {
        location.reload();
      });
    }
  }
});
