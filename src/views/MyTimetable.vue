<template>
	<div v-if="authenticated">
		<transition appear name="fade">
			<div>
				<div class="text-right">
					<a :href="timetableUrl">Go To Full Page</a>
				</div>
				<iframe :src="timetableUrl" style="height: 85vh" width="100%" frameborder="0"></iframe>
			</div>
		</transition>
	</div>
	<template v-else>
		<div class="text-center">Authenticating...</div>
	</template>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
export default defineComponent({
	beforeUpdate() {
		if (!this.store.state.loggedIn) router.push('/');
	},
	computed: {
		authenticated() {
			return this.store.state.user === 'anaunz@gmail.com';
		}
	},
	data() {
		return {
			timetableUrl:
				'https://browser.ted.is.ed.ac.uk/generate?courses[]=INFR11077_SS1_SB5%20&courses[]=INFR11136_SS1_SEM1&courses[]=INFR11147_SS1_SEM2&courses[]=INFR11010_SV1_SEM2&courses[]=INFR11023_SV1_SEM2&courses[]=INFR11161_SV1_SEM1&courses[]=INFR11145_SV1_YR&courses[]=INFR11088_SV1_SEM1&courses[]=INFR11098_SV1_SEM2&courses[]=INFR11125_SV1_SEM1&courses[]=INFR11144_SV1_SEM1&show-close=1&show-close=1&period=SEM1'
		};
	}
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
