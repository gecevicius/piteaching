import Vue from 'vue'
import Router from 'vue-router'
import Project from '@/components/Project'
import Tutorial from '@/components/Tutorial'
import About from '@/components/tutorials/About'
import Toolbox from '@/components/tutorials/Toolbox'
import Introduction from '@/components/tutorials/Introduction'
import WSpace from '@/components/tutorials/WSpace'
import ConsoleDash from '@/components/tutorials/ConsoleDash'

Vue.use(Router)


export default new Router({
	mode:'history',
	routes: [
	{
		path: '/',
		name: 'Project',
		component: Project
	},
	{
		path: '/documentation',
		name: 'Documentation',
		component: Tutorial,
		children:[
		{
			path: '/about',
			name: 'About',
			component: About
		},
		{
			path: '/toolbox',
			name: 'Toolbox',
			component: Toolbox
		},
		{
			path: '/introduction',
			name: 'Introduction',
			component: Introduction
		},
		{
			path: '/workspace',
			name: 'Wspace',
			component: WSpace
		},
		{
			path: '/consoledash',
			name: 'Consoledash',
			component: ConsoleDash
		},
		]
	}
	]
})
