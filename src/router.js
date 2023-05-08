import Vue from 'vue'
import Router from 'vue-router'
import Fantasy from '@/views/Fantasy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/fantasy',
      name: 'fantasy',
      component: Fantasy,
    },

    {
      path: '/fantasy',
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
      component: () => import( '@/views/Stats.vue')
    },

    {
      path: '/stats/team/:teamId',
      name: 'teamPage',
      props: true,
      component: () => import( '@/components/stats/team/TeamPage.vue')
    },

    {
      path: '/stats/:playerId',
      name: 'playerPage',
      props: true,
      component: () => import( '@/components/stats/player/PlayerPage.vue')
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import( '@/views/Settings.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( '@/views/About.vue')
    }
  ]
})
