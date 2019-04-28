<template>
	<div>
		<v-toolbar class="white" elevation-1>
			<v-toolbar-title><Logo></Logo></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat @click="$router.push({name:'Project'})">Workspace</v-btn>
				<Settings></Settings>
				<v-btn flat @click="$router.push({name:'Documentation'})">Documentation</v-btn>
			</v-toolbar-items>
		</v-toolbar>
	</div>
</template>
<script>
	import Logo from './Logo'
	import Settings from './Settings'
	export default{
		name:'Nav',
		components:{
			'Logo':Logo,
			'Settings':Settings
		},
		data(){
			return {

			}
		}
	}
</script>

<style scoped>
.v-toolbar{
	z-index: 100
}
</style>