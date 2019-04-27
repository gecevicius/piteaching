import Vue from 'vue'
import Router from 'vue-router'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
	{
		path: '/',

		name: 'Project',
		component: Project
	}
	]
})
