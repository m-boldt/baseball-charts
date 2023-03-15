import Vue from 'vue';
import Vuex from 'vuex';

import { firebase } from './firebase.js';
import { getStorage, ref, getBlob, uploadBytes } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';

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

    gameState: state => () => {
      return {
        gameState: {
          opponent: state.opponent,
          pitchers: state.pitchers
        }
      };
    }
  },

  mutations: {
    clearGameData(state) {
      state.gameId = '';
      state.pitcheres = [];
      state.activePitcher = undefined;
      state.activeHitter = {};
      state.opponent = '';
    },

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

    async startGame({ commit, state }, opponentName) {
      commit('clearGameData');

      state.gameId = uuidv4();
      state.opponent = opponentName;
      state.pitchers = [];

      const storage = getStorage(firebase);
      const fileName = `game_${state.gameId}.json`;
      const fileRef = ref(storage, fileName);

      const data = {
        active: true,
        gameState: {
          opponent: state.opponent,
          pitchers: state.pitchers
        }
      };

      const jsonString = JSON.stringify(data);
      const jsonBlob = new Blob([jsonString], { type: 'application/json' });

      const parsedJson = JSON.parse(await jsonBlob.text());
      await uploadBytes(fileRef, jsonBlob);

      this.dispatch('saveState');
      this.dispatch('addToList');

      return state.gameId;
    },

    async saveState({ state }) {
      const storage = getStorage(firebase);
      const fileRef = ref(storage, `game_${state.gameId}.json`);

      const data = {
        active: true,
        gameState: {
          opponent: state.opponent,
          pitchers: state.pitchers
        }
      };

      const jsonString = JSON.stringify(data);
      const jsonBlob = new Blob([jsonString], { type: 'application/json' });
      await uploadBytes(fileRef, jsonBlob);
    },

    addAB({ state, dispatch }, abData) {
      state.activePitcher.atBats.push(abData);
      dispatch('updateGameState');
    },

    async setGameState({ state }, gameId) {
      state.isActive = undefined;

      try {
        const storage = getStorage(firebase);
        const fileRef = ref(storage, `game_${gameId}.json`);

        const dataBlob = await getBlob(fileRef);
        const data = JSON.parse(await dataBlob.text());

        state.gameId = gameId;
        state.isActive = data.active;
        state.opponent = data.gameState.opponent;
        state.pitchers = data.gameState.pitchers;

        return data.id;
      } catch (e) {
        console.log(e);
        return '';
      }
    },

    updateGameState({ dispatch, state }) {
      if (state.pitchers.length === 0 || state.gameId === '') {
        return;
      }

      dispatch('saveState');
    },

    async endGame({ commit, state }) {
      const storage = getStorage(firebase);
      const fileRef = ref(storage, `game_${state.gameId}.json`);

      const data = {
        active: false,
        gameState: {
          opponent: state.opponent,
          pitchers: state.pitchers
        }
      };

      const jsonString = JSON.stringify(data);
      const jsonBlob = new Blob([jsonString], { type: 'application/json' });
      await uploadBytes(fileRef, jsonBlob);

      // mark the item in the games list as inactive
      const listFileRef = ref(storage, 'gamesList.json');

      const dataBlob = await getBlob(listFileRef);
      const json = JSON.parse(await dataBlob.text());

      const match = json.filter(x => x.id === state.gameId);
      if (match.length > 0) {
        match[0].active = false;

        const updatedJsonString = JSON.stringify(json);
        const updatedBlob = new Blob([updatedJsonString], {
          type: 'application/json'
        });

        await uploadBytes(listFileRef, updatedBlob);
      }

      commit('clearGameData');
    },

    async addToList({ state }) {
      const data = {
        createdAt: new Date(),
        opponent: state.opponent,
        active: true,
        id: state.gameId
      };

      const storage = getStorage(firebase);
      const fileRef = ref(storage, 'gamesList.json');

      const dataBlob = await getBlob(fileRef);
      const json = JSON.parse(await dataBlob.text());

      json.push(data);

      const jsonString = JSON.stringify(json);
      const updatedBlob = new Blob([jsonString], { type: 'application/json' });

      await uploadBytes(fileRef, updatedBlob);
    },

    async listGames() {
      const storage = getStorage(firebase);
      const pathReference = ref(storage, 'gamesList.json');
      let games = [];

      // var jsonString = JSON.stringify([]);
      // var blob = new Blob([jsonString], { type: 'application/json' });
      // uploadBytes(pathReference, blob).then(snapshot => {
      //   console.log('Uploaded a blob or file!');
      //   console.log(snapshot);
      // });

      try {
        // const downloadUrl = await getDownloadURL(pathReference);
        // const { data } = await axios.get(downloadUrl);
        // console.log(data);
        const dataBlob = await getBlob(pathReference);
        games = JSON.parse(await dataBlob.text());
      } catch (e) {
        console.log('error downloading the file');
        var jsonString = JSON.stringify([]);
        var blob = new Blob([jsonString], { type: 'application/json' });
        uploadBytes(pathReference, blob).then(snapshot => {
          console.log('Uploaded a blob or file!');
          console.log(snapshot);
        });
      }

      return games;
    }
  }
});
