import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App.vue'
import lodash from 'lodash'
import Gloabl from './components/_global'
import {utils} from '@/mixin/utils'

//import HelloWorld from '@/components/HelloWorld.vue'


Vue.config.productionTip = false
Vue.prototype.$http = axios; 
Vue.prototype._ = lodash;

Vue.mixin(utils);
	
//Vue.component('HelloWorld', HelloWorld);

export const EventBus = new Vue({
	methods:{
		fromSister(m){
			EventBus.$emit('fromSister', m);
		}
	}
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
