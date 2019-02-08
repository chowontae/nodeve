<template>
	<div>
		<h1>This is Brother!! {{myMsg}}</h1>
		<input type="text" v-model="myMsg">
		<button @click="sendToHome()">SendToHOme</button>
	</div>
</template>

<script>
	import {EventBus} from '@/main';
	
	export default {
		props:{
			msg: '' 
		}, 
		data(){
			return{
				myMsg: null
			}
		},
		created(){
			console.log( "Brother.created!!;");
			this.myMsg = this.msg;
			EventBus.$on('fromSister', ret => {
				console.log('Brother.on>>', ret);
				
				this.myMsg = ret;
			});
		}, 
		methods:{
			sendToHome(){
				
				this.$emit("fromBrother", this.myMsg);
			}
		}
	}
</script>