import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import MyTimetable from '../views/MyTimetable.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
	},
	{
		path: '/mytimetable',
		name: 'MyTimeTable',
		component: MyTimetable
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior(to) {
		if (to.hash) {
			return { el: to.hash };
		}
	}
});

export default router;
