<template>
	<div>
		AAA
		<v-toolbar>
			<v-toolbar-side-icon></v-toolbar-side-icon>
			<v-toolbar-title><Logo></Logo></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat>Link One</v-btn>
				<v-btn flat>Link Two</v-btn>
				<v-btn flat>Link Three</v-btn>
			</v-toolbar-items>
		</v-toolbar>
	</div>
</template>
<script>
	import Logo from './Logo'
	export default{
		name:'Nav',
		data(){
			return {

			}
		}
	}
</script>