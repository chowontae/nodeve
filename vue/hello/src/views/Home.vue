<template>
  <div class="home">
  	<h1 class="red">{{jsonData.msg}}</h1>
  	<Brother :msg="jsonData.msg" @fromBrother="fromBrother">
  	</Brother>
  	<Sister :msg="jsonData.msg" @fromSister="fromSister">
  	</Sister>
  	<h1 class="red">{{ttt}}</h1>
  	<input type="text" v-model="ttt">
  	==========================
  	<h1 class="red">{{_.random(5)}}</h1>
  	<h1 class="red">{{_.camelCase('aaa-bbb')}}</h1>
  	<h1 class="red">{{_.upperFirst(_.camelCase('aaa-bbb'))}}</h1>  	
  	<ul>
  		<li v-for="reply in replies">{{reply.rno}}. <input type="text" v-model="reply.replytext">
  			<button v-on:click.prevent="saveReply(reply)">Save{{reply.replytext}}</button>
  		</li>
  	</ul>
    <img alt="Vue logo" src="../assets/logo.png">
    <span v-once>메세지 : {{msg}}</span>
    <input type="text" v-model="msg">
    <span v-html="msg"></span>
    <span class="red">{{reversedMessage}}</span>
  
    <div>
    firstName :-- {{fullName}}  --
    <button v-on:click="fullN()">FullN</button>
    
    counter : {{counter}}
    <button v-on:click="counter+=1">Add 1</button>
    </div>
    <div>
    	<a href="#" v-on:click.prevent="aaa()">
    		aaaaaaaaa
    		<span v-on:click.stop="bbb()">bbb</span>
    	</a>
    </div>
    <button v-bind:disabled="isButtonDisabled" v-on:click="isButtonDisabled = !isButtonDisabed">disabledButton</button>
    <todo-item v-for="item in groceryList"
    			v-bind:todo="item"
    			v-bind:key="item.id"
    ></todo-item>
    
    <todo-item :todo="groceryList[0]"></todo-item>
    <todo-item :todo="{id:999, text:'999999'}"></todo-item>
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
/* import TodoItem from '@/components/todo-item'
import Brother from '@/components/Brother'
import Sister from '@/components/Sister' */


export default {
  name: 'home',
/*   components: {
    TodoItem, Brother, Sister
  }, */
  created(){
	this.fetchReplies();  
	
	//watch를 이런식으로 사용가능 , ttt가 변경되면 this._.debounce를 실행하라.. 1초에 한번씩 
	//debounce를 사용하는 경우는 타이핑을 하여 서버와 연동이 있을 경우 1초에 5회 타이핑을 하면 1초 5번 서버와 연동을 하게 된다. 
	//그러면 서버에 부하가 만이 생김으로 debounce를 사용하여 1초에 한번씩 서버와 연동하게 함
	//ttt 가 변경이 된 후 1초 후에 aaa를 실행한다.( 변경이 완료되야함 )
	this.$watch('ttt', this._.debounce(this.aaa, 1000));
	//this.$watch('ttt', this.aaa);
	
	
	let a = _.delay(this.myList,1000, 'later');
	//console.log( "_delay : " + a );
	//this._.debounce(this.myList, 1000);
  }, 
  //mixins: [utils],  
  methods:{
	fromBrother(newMsg){
		//...arguments는 함수에 무엇이 전달되었든 arguments로 받는다 array값임
		console.log("fromBrother>>", ...arguments);
		
		this.jsonData.msg = this.sister(newMsg);
	}, 
	fromSister(newMsg){
		//...arguments는 함수에 무엇이 전달되었든 arguments로 받는다 array값임
		console.log("fromSister>>", ...arguments);
		
		this.jsonData.msg = newMsg;
	}, 
	saveReply(reply){
		this.$http.put("http://localhost/apis/replies/1/"+reply.rno, reply).then( ret => {
			if( ret.status != 200 ) return [];
			
	  		console.log( "saveReply.put.ret >> " , ret);
			alert( ret.data + " 개의 댓글이 수정되었습니다" ); 
	 });
	}, 
	fetchReplies(){
		this.$http.get("http://localhost/apis/replies/1").then( ret => {
			if( ret.status != 200 ) return [];
			
	  		console.log( "replies.ret >> " , ret);
			this.replies = ret.data;  
	 });
	}, 
	aaa(e){
		console.log("AAAAAAAAAAAAAAAA" + e);
	}, 
	bbb(){
		console.log("BBBBBBBBBBBBBBBBB");
	}, 
	fullN(){console.log( 'fullN');
		this.fullName = "jo won";
	}, 
	myList(e){
		console.log( _.now() + "myList : " + e );
		_.delay(this.myList, 1000, 'later'); 
	}
  },
  computed:{
	  reversedMessage: function(){
		  return this.msg.split('').reverse().join('');
	  }, 
	  fullName: {
		  set: function(newValue){
			  var names = newValue.split(' ');
			  this.firstName = names[0];
			  this.lastName = names[names.length-1];
			  console.log("fullName -> set : firstName : " + this.firstName);
		  }, 
		  get: function(){
			  console.log("fullName -> get : lastName : " + this.lastName);
			  return this.firstName + ' ' + this.lastName;
		  }
	  }
  },
  watch:{
	  msg: function(){
		  console.log(".....", this.msg);
	  }, 
	  reversedMessage: function(){
		  console.log("ttttt");
	  }
  },
  data(){
	  return {
		jsonData: {msg: 'message', id:123}, 
		ttt: '', 
		firstName: '', 
		lastName: '',		  
		msg: 'abcd', 
		isButtonDisabled: false, 
		replies: [], 
		groceryList: [
		    { id: 0, text: 'Vegetables' },
		    { id: 1, text: 'Cheese' },
		    { id: 2, text: 'Whatever else humans are supposed to eat' }
		  ],
		  counter:0

	  }
  }
}
</script>
<style>
.red{color:red;}
</style>