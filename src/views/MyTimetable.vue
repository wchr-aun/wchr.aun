<template>
	<div v-if="authenticated">
		<div style="border-bottom: 2px solid #eaeaea">
			<ul class="flex">
				<li
					v-bind:class="[activeTab === 0 ? 'bg-white text-gray-500' : 'bg-gray-400 text-gray-50']"
					class="py-2 px-6 rounded-t-lg font-bold cursor-pointer"
					@click="activeTab = 0"
				>
					Grid Timetable
				</li>
				<li
					v-bind:class="[activeTab === 1 ? 'bg-white text-gray-500' : 'bg-gray-400 text-gray-50']"
					class="py-2 px-6 rounded-t-lg font-bold cursor-pointer"
					@click="activeTab = 1"
				>
					Path Timetable
				</li>
			</ul>
		</div>
		<template v-if="activeTab === 0">
			<transition appear name="fade">
				<GridTimetable />
			</transition>
		</template>
		<template v-else>
			<transition appear name="fade">
				<div>
					<div class="text-right">
						<a :href="timetableUrl">Go To Full Page</a>
					</div>
					<iframe :src="timetableUrl" style="height: 85vh" width="100%" frameborder="0"></iframe>
				</div>
			</transition>
		</template>
	</div>
	<template v-else>
		<div class="text-center">Authenticating...</div>
	</template>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import GridTimetable from '@/components/GridTimetable.vue';
export default defineComponent({
	components: { GridTimetable },
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
			activeTab: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
				? 1
				: 0,
			timetableUrl:
				'https://browser.ted.is.ed.ac.uk/generate?courses[]=INFR11077_SS1_SB5%20&courses[]=INFR11136_SS1_SEM1&courses[]=INFR11147_SS1_SEM2&courses[]=INFR11010_SV1_SEM2&courses[]=INFR11023_SV1_SEM2&courses[]=INFR11161_SV1_SEM1&courses[]=INFR11145_SV1_YR&courses[]=INFR11088_SV1_SEM1&courses[]=INFR11098_SV1_SEM2&courses[]=INFR11130_SS1_SEM1&courses[]=INFR11144_SV1_SEM1&show-close=1&show-close=1&period=SEM1'
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
