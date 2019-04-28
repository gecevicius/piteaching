<template>
	<div>
		<v-toolbar>
			<v-toolbar-title><Logo></Logo></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<Settings></Settings>
				<v-btn flat>Tutorial</v-btn>
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