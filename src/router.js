import Vue from 'vue';
import Router from 'vue-router';
import StartGame from './components/StartGame.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'startGame',
      component: StartGame
    },
    {
      path: '/hitter',
      name: 'hitter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'hitter' */ './components/SelectHitter.vue')
    },
    {
      path: '/pitcher',
      name: 'pitcher',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'pitcher' */ './components/SelectPitcher.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'chart' */ './components/Chart.vue')
    }
  ]
});
