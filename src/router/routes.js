
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/favoris', component: () => import('pages/FavorisPage') },
      { path: '/connexion', component: () => import('pages/PageConnexion') },
      { path: '/:salle?', component: () => import('components/SalleView') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
