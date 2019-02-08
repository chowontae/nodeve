<template>
	<div>
		<li>  {{todo.text}}___</li>
	</div>
</template>
<script>

export default {
	name: 'todo-item',
	props:{
		todo:{
			type: Object
		},
		required: true
	}
}
</script>