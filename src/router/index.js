import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import LibraryView from '../views/LibraryView.vue'
import LibraryView_salsa2 from '../views/LibraryView_salsa2.vue'
import LibraryView_salsa3 from '../views/LibraryView_salsa3.vue'

import LibraryView_kpop from '../views/LibraryView_kpop.vue'
import LibraryView_bachata from '../views/LibraryView_bachata.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/search',
      component: SearchView
    },
    {
      path: '/library',
      component: LibraryView
    },



    {
      path: '/library_salsa2',
      component: LibraryView_salsa2
    },


    {
      path: '/library_salsa3',
      component: LibraryView_salsa3
    },


    {
      path: '/LibraryView_kpop',
      component: LibraryView_kpop
    },


    {
      path: '/LibraryView_bachata',
      component: LibraryView_bachata
    }


  ]
})

export default router
