<template>
	<v-dialog
	v-model="dialog"
	width="500"
	>
	<template v-slot:activator="{ on }">
		<v-btn
		flat
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
	User Settings
</v-card-title>

<v-card-text>
	<v-layout row wrap>

		<v-flex xs12>
			<v-label>Set your username : </v-label>
			<v-text-field label="Username" solo v-model="username" placeholder="Your username"></v-text-field>
		</v-flex>
		<v-flex xs12>
			<v-label>Share access to your Rasperry Pi with this link : </v-label>
			<v-text-field solo v-model="url" ></v-text-field>
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
<v-btn
color="primary"
flat
@click="dialog = false"
>
Save
</v-btn>
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