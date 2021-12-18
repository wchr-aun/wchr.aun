<template>
	<div class="pb-4">
		<router-link class="uppercase text-2xl font-bold" to="#contact"> # Contact </router-link>
	</div>
	<div class="flex justify-center">
		<div class="text-sm">
			<p>
				<font-awesome-icon class="mr-2" icon="envelope" /> Email:
				<a class="underline font-extrabold" href="mailto:wchr.aun@gmail.com">
					wchr.aun@gmail.com
				</a>
			</p>
			<p>
				<font-awesome-icon class="mr-2" :icon="['fab', 'github']" /> GitHub:
				<ExternalLink link="https://github.com/wchr-aun" text="wchr-aun"></ExternalLink>
			</p>
			<p>
				<font-awesome-icon class="mr-2" :icon="['fab', 'linkedin']" /> LinkedIn:
				<ExternalLink link="https://www.linkedin.com/in/wchr-aun/" text="wchr-aun"></ExternalLink>
			</p>
		</div>
	</div>
</template>

<script>
import ExternalLink from '@/components/ExternalLink.vue';
export default {
	components: { ExternalLink }
};
</script>
