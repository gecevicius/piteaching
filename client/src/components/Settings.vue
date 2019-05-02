<template>
	<v-dialog
	v-model="dialog"
	width="500"
	>
	<template v-slot:activator="{ on }">
		<v-btn
		flat
		id="settings-btn"
		v-on="on"
		>
		Settings
	</v-btn>
</template>

<v-card>
	<v-card-title
	class="headline grey lighten-2"
	primary-title
	>
	Settings
</v-card-title>

<v-card-text>
	<v-layout row wrap 	>
		<v-flex xs12 mb-4>
			<v-label>Share access to your Rasperry Pi with this link : </v-label>
		</v-flex>
		<v-flex xs8  pr-1  d-flex>
			
			<v-text-field hide-details ma-0 readonly disabled  v-model="url"  ></v-text-field>
			
		</v-flex>
		<v-flex xs4  pl-1 ma-0 >
			<v-btn
			primary
			block
			v-clipboard="() => this.url">Copy</v-btn>
		</v-flex>
	</v-layout>
</v-card-text>

<v-divider></v-divider>

<v-card-actions>
	<v-btn
	color="secondary"
	flat
	@click="dialog = false"
	>
	Close
</v-btn>
<v-spacer></v-spacer>

</v-card-actions>
</v-card>
</v-dialog>
</template>
<script>

	export default{
		name:'Settings',
		components:{

		},
		data(){
			return {
				dialog:false
			}
		},
		computed:{
			url(){
				return this.$store.getters.url
			},
			username:{
				set(value){
					this.$store.commit('username',{username:value});
				},
				get(){
					return this.$store.getters.username;
				}

			}
		},
		methods:{
			save(){


			}
		}
	}
</script>