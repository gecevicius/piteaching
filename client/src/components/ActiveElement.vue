<template>
	<v-flex xs2  v-if="element!=undefined"   class="element-block text-xs-center">
		<div class="gpio-element">
			<div>{{element.getType()}}</div>
			<div><img width="50px" :src="getComponentImg(element.getType())"></div>
			<v-layout>
				<v-flex xs6><div text="center" style="font-weight:bold">{{element.getPin()}}</div></v-flex>
				<v-flex xs6> <div text="center" style="font-weight:bold">{{element.getVal()}}</div></v-flex>
			</v-layout>

		</div>
	</v-flex>
</template>
<script>
	export default{
		name:'ActiveElement',
		props:['element'],
		data(){
			return {

			}
		},
		methods:{
			getComponentImg(type){
				var img = require("../assets/staticimg/"+type+".png")
				return img
			}
		}
	}
</script>