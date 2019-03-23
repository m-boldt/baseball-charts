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

  for (let i = 0; i < pitcher.atBats.length; i++) {
    pitches += pitcher.atBats[i].pitches.length;
  }

  return pitches;
});

Vue.filter('calculateBalls', function(pitcher) {
  let balls = 0;

  for (let i = 0; i < pitcher.atBats.length; i++) {
    balls += pitcher.atBats[i].pitches.filter(function(p) {
      return p.strike === '0';
    }).length;
  }

  return balls;
});

Vue.filter('calculateStrikes', function(pitcher) {
  let strikes = 0;

  for (let i = 0; i < pitcher.atBats.length; i++) {
    strikes += pitcher.atBats[i].pitches.filter(function(p) {
      return p.strike === '1';
    }).length;
  }

  return strikes;
});

Vue.filter('calculateAtBats', function(pitcher) {
  return pitcher.atBats.length;
});

Vue.filter('calculateWalks', function(pitcher) {
  return pitcher.atBats.filter(function(ab) {
    return ab.result === '4';
  }).length;
});

Vue.filter('calculateStrikeouts', function(pitcher) {
  return pitcher.atBats.filter(function(ab) {
    return ab.result === '1';
  }).length;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
