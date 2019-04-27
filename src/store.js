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
    gameId: ''
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1NTkzMTg0MywiZXhwIjoxNTU4NTIzODQzfQ.77a-CjtrWi5SuhhgrY1QGt_HVQk9yx7cdnJNxXg1wUE'
        }
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1NTkzMTg0MywiZXhwIjoxNTU4NTIzODQzfQ.77a-CjtrWi5SuhhgrY1QGt_HVQk9yx7cdnJNxXg1wUE'
        }
      })
      .then(response => {
        if (response.data.length > 0) {
          var item = response.data[0];
          state.gameId = response.data[0].id;
          state.opponent = item.gameState.opponent;
          state.pitchers = item.gameState.pitchers;
        }
      });
    },

    updateGameState({ state, getters }) {
      if (state.pitchers.length === 0 || state.gameId === '') {
        return;
      }

      axios.put(`https://hr-freeware.info/charts/${state.gameId}`, {
        ...getters.gameState,
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1NTkzMTg0MywiZXhwIjoxNTU4NTIzODQzfQ.77a-CjtrWi5SuhhgrY1QGt_HVQk9yx7cdnJNxXg1wUE'
        }
      })
    },

    endGame({ state, getters }) {
      axios.put(`https://hr-freeware.info/charts/${state.gameId}`, {
        ...getters.gameState,
        Active: false,
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzRhMWJkOWMzMzdmNzMyYWQxMzNiOTIiLCJpZCI6IjVjNGExYmQ5YzMzN2Y3MzJhZDEzM2I5MiIsImlhdCI6MTU1NTkzMTg0MywiZXhwIjoxNTU4NTIzODQzfQ.77a-CjtrWi5SuhhgrY1QGt_HVQk9yx7cdnJNxXg1wUE'
        }
      });

      state.gameId = '';
    }
  }
});
