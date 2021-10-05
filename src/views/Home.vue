<template>
	<p class="text-2xl text-center font-bold pb-8">- Work In Progress -</p>
	<transition appear name="fade">
		<div class="pb-8" id="aboutme">
			<AboutMe />
		</div>
	</transition>
	<hr class="p-4" />
	<transition appear name="fade">
		<div class="pb-8" id="contact">
			<ContactMe />
		</div>
	</transition>
	<hr class="p-4" />
	<transition appear name="fade">
		<div id="timeline">
			<Timeline :list="timeline" />
		</div>
	</transition>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta';
import { defineComponent } from 'vue';
import Timeline from '@/components/Timeline.vue';
import AboutMe from '@/components/AboutMe.vue';
import ContactMe from '@/components/ContactMe.vue';

export default defineComponent({
	setup() {
		useMeta({
			title: 'Home'
		});
	},
	name: 'Home',
	components: { Timeline, AboutMe, ContactMe },
	data() {
		return {
			timeline: [
				{
					position: 'left',
					title: 'Studied at KMUTT',
					message:
						'Being the first rank at the admission entrance in BE Computer Engineering, KMUTT.',
					hint: 'Aug 2016',
					icon: 'university'
				},
				{
					position: 'right',
					title: 'Graduated from KMUTT',
					message: 'Graduated with a second-class honour (GPAX 3.51/4.00).',
					hint: 'Jun 2020',
					icon: 'graduation-cap'
				},
				{
					position: 'left',
					title: 'Worked at KBTG',
					message:
						'Started working at KBTG as a software engineer. Specifically worked on the frontend side of the project.',
					hint: 'Jul 2020',
					icon: 'briefcase'
				},
				{
					position: 'left',
					title: 'Published a paper',
					message:
						'Published a conference paper called "The Relations Between Implementation Date of Policies and The Spreading of COVID-19"',
					more: 'https://ieeexplore.ieee.org/abstract/document/9245459/',
					hint: 'Jul 2020',
					icon: 'folder-open'
				},
				{
					position: 'right',
					title: 'Left KBTG',
					message: 'Left KBTG',
					hint: 'Dec 2020',
					icon: 'sign-out-alt'
				},
				{
					position: 'left',
					title: 'Worked at Accenture',
					message:
						'Started working at Accenture Thailand as an application development analyst. Specifically worked on the frontend side of the project.',
					hint: 'Jan 2021',
					icon: 'briefcase'
				},
				{
					position: 'right',
					title: 'Left Accenture',
					message: 'Left Accenture Thailand',
					hint: 'Jul 2021',
					icon: 'sign-out-alt'
				},
				{
					position: 'left',
					title: 'Studying at UoE',
					message: 'Studied MSc Computer Science at University of Edinburgh',
					hint: 'Sep 2021',
					icon: 'university'
				}
			]
		};
	}
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
