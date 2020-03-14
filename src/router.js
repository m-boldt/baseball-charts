import Vue from 'vue';
import Router from 'vue-router';
import StartGame from './pages/StartGame.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'startGame',
      component: StartGame
    },
    {
      path: '/hitter/:id',
      name: 'hitter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'hitter' */ './pages/SelectHitter.vue')
    },
    {
      path: '/pitcher/:id',
      name: 'pitcher',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'pitcher' */ './pages/SelectPitcher.vue')
    },
    {
      path: '/chart/:id',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'chart' */ './pages/Chart.vue')
    },
    {
      path: '/sumamry/:id',
      name: 'summary',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'chart' */ './pages/Summary.vue')
    }
  ]
});
