import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars);
library.add(faUndo);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.filter('calculatePitches', function(pitcher) {
  let pitches = 0;

  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  for (let i = 0; i < pitcher.atBats.length; i++) {
    pitches += pitcher.atBats[i].pitches.length;
  }

  return pitches;
});

Vue.filter('calculateBalls', function(pitcher) {
  let balls = 0;

  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  for (let i = 0; i < pitcher.atBats.length; i++) {
    balls += pitcher.atBats[i].pitches.filter(function(p) {
      return p.strike === '0';
    }).length;
  }

  return balls;
});

Vue.filter('calculateStrikes', function(pitcher) {
  let strikes = 0;

  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  for (let i = 0; i < pitcher.atBats.length; i++) {
    strikes += pitcher.atBats[i].pitches.filter(function(p) {
      return p.strike === '1';
    }).length;
  }

  return strikes;
});

Vue.filter('calculateAtBats', function(pitcher) {
  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  return pitcher.atBats.length;
});

Vue.filter('calculateWalks', function(pitcher) {
  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  return pitcher.atBats.filter(function(ab) {
    return ab.result === '4';
  }).length;
});

Vue.filter('calculateStrikeouts', function(pitcher) {
  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  return pitcher.atBats.filter(function(ab) {
    return ab.result === '1';
  }).length;
});

Vue.filter('calculateOnBase', function(pitcher) {
  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  const onBaseKeys = ['4', '5', '6', '7', '8', '9', '10'];

  return pitcher.atBats.filter(function(ab) {
    return onBaseKeys.indexOf(ab.result) > -1;
  }).length;
});

Vue.filter('calculateOuts', function(pitcher) {
  if (pitcher === undefined || pitcher.atBats === undefined) {
    return 0;
  }

  const outKeys = ['0', '1', '2'];

  return pitcher.atBats.filter(function(ab) {
    return outKeys.indexOf(ab.result) > -1;
  }).length;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
