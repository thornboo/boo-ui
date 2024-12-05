import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home/index.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: home,
		},
		// 静态样式案例的路由
		{
			path: '/staticStyle/flashyText',
			name: 'flashyText',
			component: () => import('../views/staticStyle/flashyText/index.vue'),
		},
		{
			path: '/staticStyle/noCollisionLineLoading',
			name: 'noCollisionLineLoading',
			component: () => import('../views/staticStyle/noCollisionLineLoading/index.vue'),
		},
		{
			path: '/staticStyle/stereoCarousel',
			name: 'stereoCarousel',
			component: () => import('../views/staticStyle/stereoCarousel/index.vue'),
		},
		{
			path: '/staticStyle/raindropBackground',
			name: 'raindropBackground',
			component: () => import('../views/staticStyle/raindropBackground/index.vue'),
		},
	],
})

export default router
