<template>
	<div class="text-gray-200 bg-gray-600 opacity-90 p-4 text-center text-xs">
		Copyright©2021. MADE BY ME | WCHR-AUN. All Rights Reserved | GitHub:
		<ExternalLink link="https://github.com/wchr-aun/wchr.aun" text="wchr-aun" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import ExternalLink from '@/components/ExternalLink.vue';

export default defineComponent({
	components: { ExternalLink }
});
</script>
