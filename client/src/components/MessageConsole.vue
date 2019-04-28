<template >
	<v-layout elevation-1>
		<div class="msg-console" >
			<v-layout align="left" mb-4>
				<v-flex xs3><b>Type</b></v-flex>
				<v-flex xs0><b>Message</b></v-flex>
			</v-layout>
			<v-layout align="left" row-wrap v-for="msg in this.messages">
				<v-flex xs3 class="print-type">{{msg.type}}</v-flex>
				<v-flex xs9 class="print-msg">{{msg.message}}</v-flex>
			</v-layout>
		</div>
	</v-layout>
</template>
<script>
	export default{
		name:'MessageConsole',
		props:['messages'],
		data(){
			return {

			}
		}
	}
</script>

<style >
.print-type,.print-msg{
	font-family: monospace;
}
.print-type{
	color:rebeccapurple;
}

.print-msg{

}

</style>