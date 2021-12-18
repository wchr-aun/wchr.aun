<template>
	<a class="font-extrabold underline" :href="link" target="_blank">
		{{ text }} <font-awesome-icon icon="external-link-alt" />
	</a>
</template>

<script lang="ts">
export default {
	name: 'ExternalLink',
	props: ['link', 'text']
};
</script>
