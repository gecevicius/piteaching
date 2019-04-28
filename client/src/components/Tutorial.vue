<template>
	<div id="tutorial">
		<v-container fluid pa-0>
			<v-layout row wrap pa-0 ma-0>
				<v-flex xs3>	<v-navigation-drawer

					
					class="blue accent-2"
					height="100%"
					style="overflow:visible;min-height:calc(100vh - 65px)"
					dark
					permanent
					>
					<v-list style="position: sticky;top:0">
						<h2 align="center" class="ma-2">Documentation</h2>
						<v-list-tile
						@click="$router.push({name:'About'})"
						>

						<v-list-tile-content>
							<v-list-tile-title>About</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile
					@click="$router.push({name:'Introduction'})"
					>

					<v-list-tile-content>
						<v-list-tile-title>Introduction</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile
				@click="$router.push({name:'Wspace'})"
				>
				<v-list-tile-content>
					<v-list-tile-title>Block Workspace</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-list-tile
			@click="$router.push({name:'Toolbox'})"
			>

			<v-list-tile-content>
				<v-list-tile-title>Toolbox</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>

		
		<v-list-tile
		@click="$router.push({name:'Consoledash'})"
		>

		<v-list-tile-content>
			<v-list-tile-title>Console Dashboard</v-list-tile-title>
		</v-list-tile-content>
	</v-list-tile>
	<v-list-tile
	@click=""
	>

	<v-list-tile-content>
		<v-list-tile-title>Projects</v-list-tile-title>
	</v-list-tile-content>
</v-list-tile>
</v-list>
</v-navigation-drawer></v-flex>
<v-flex xs9>
	
	<router-view>
		
	</router-view>

</v-flex>
</v-layout>
</v-container>


</div>
</template>

<script>
	
	export default{
		name:'Tutorial',
		components:{

		},
		data(){
			return {
				items:{}
			}
		}
	}
</script>

<style >

</style>