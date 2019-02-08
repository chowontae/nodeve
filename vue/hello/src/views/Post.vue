<template>
	<div>
		<h1>This is POST: {{$route.params.id}}</h1>
		<div v-if="post">
			<div>{{post.replyer}}</div>
			<div>{{post.replytext}}</div>
		</div>
	</div>
</template>

<script>
//라우터는 1회만 접근하고 그 이후는 접근하지 않는다. 
//component는 이벤트가 있을 때마다 접근한다. 
//이벤트 발생 시 계속적으로 라우터가 작동하게 하려면 watch를 이용해야 한다. 
export default {
	created(){
		console.log("Post.created>>", this.$route.fullPath, this.$route.params, this.$route.query);
		//this.id = this.$route.params.id;		
		this.aaa('fromCreate!!');
	}, 
	watch:{
		'$route' : {
			handler: 'aaa', 
			immediate: true	//첫번째에도 라우터를 감시하게 함	
		}
	}, 
	methods:{
		aaa(){
			//console.log("aaaaaaaaaaaa>>", this.$route.params.id);
			let id = this.$route.params.id;
			this.$http.get("http://localhost:7000/apis/replies/1/"+id ).then( ret => {
				if( ret.status != 200 ) return [];
				console.log( "replies.ret>>", ret);
				this.post = ret.data;
			});
		}
	}, 
	data(){
		return{
			id: 0, 
			post: null, 
			posts:[
				{id:1, title:'1번 글입니다.'},
				{id:5, title:'2번 글입니다.'},
			]
		}
	}
}
</script>