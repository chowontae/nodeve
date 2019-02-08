import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

//시스템 내부적으로 가지고 있는 속성이다. 
//this.$route.fullPath, this.$route.parmas, this.$route.query

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
    	path: '/posts', 
    	name: 'posts',
    	component: () => import('./views/Posts.vue'), 
    	children:[
    		{
    			path: 'post/:id',
    			name: 'post',
    			component: () => import('./views/Post.vue')
    		}
    	]
    }, 
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
