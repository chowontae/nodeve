<template>
	<div>
		<h1>This is Sister!! {{myMsg}}</h1>
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
			console.log( "Sister.created!!;");
			this.myMsg = this.msg;
		}, 
		methods:{
			sendToHome(){
				
				//this.$emit("fromSister", this.myMsg);
				//EventBus.$emit('fromSister', this.myMsg);
				EventBus.fromSister(this.myMsg);
			}
		}
	}
</script>