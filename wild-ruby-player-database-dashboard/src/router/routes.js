
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue')},
      { path: '/recently_added_users', component: () => import('pages/recent_users.vue')},
      { path: '/tabs', component: () => import('pages/play tabs.vue') },
      { path: '/bigQueryPWA', component: () => import('pages/BigQueryPWA.vue')},
      { path: '/stats_board', component: () => import('pages/stats_board.vue') },
      { path: '/profile', component: () => import('pages/profile.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
