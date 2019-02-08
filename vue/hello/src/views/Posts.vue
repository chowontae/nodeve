<template>
	<div>
		<h1>This is POSTS</h1>
		<ul>
			<li v-for="post in posts">
				{{post.id}}. <router-link :to="'/posts/post/' + post.id">{{post.title}}</router-link>
				<router-link :to="{name: 'post', params:{id: post.id}}">{{post.title}}</router-link>
			</li>
		</ul>
		
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	data(){
		return{
			posts:[
				{id:1, title:'1번 글입니다.'},
				{id:5, title:'2번 글입니다.'},
			]
		}
	}
}
</script>