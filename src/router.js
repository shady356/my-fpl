import Vue from 'vue'
import Router from 'vue-router'
import Fantasy from '@/views/Fantasy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'fantasy',
      component: Fantasy
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Stats.vue')
    },
    {
      path: '/stats/team/:teamId',
      name: 'statsTeamItem',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '@/components/stats/StatsTeamItem.vue')
    },
    {
      path: '/stats/:player',
      name: 'playerProfile',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '@/components/stats/PlayerProfile.vue')
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Settings.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
