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
			<v-checkbox v-model="enableSharing" label="Enable workspace sharing" ></v-checkbox>
		</v-flex>
		<v-flex xs12>
			<v-text-field label="Username" solo v-model="username" placeholder="Your username"></v-text-field>
		</v-flex>
		<v-flex xs12>
			<v-text-field label="Your key : " solo v-model="url" ></v-text-field>
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
@click="save()"
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
				username:'',
				enableSharing:false,
				dialog:false,
				url:""
			}
		},
		sockets:{
			wsSharing(data){
				console.log(data)
				this.url = data.url;
			},
		},
		computed:{
			enableSharing :{
				get(){
					var enabled = this.$store.getters.enableSharing
					return enabled
				}

			}
		},
		methods:{
			save(){
				

			}
		}
	}
</script>