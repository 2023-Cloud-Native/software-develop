import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PowerView from '../views/PowerView.vue'
import WaterView from '../views/WaterView.vue'
import EarthquakeView from '../views/EarthquakeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/power',
      name: 'power',
      component: PowerView
    },
    {
      path: '/water',
      name: 'water',
      component: WaterView
    },
    {
      path: '/earthquake',
      name: 'earthquake',
      component: EarthquakeView
    }
  ]
})

export default router
