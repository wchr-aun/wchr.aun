<template>
	<p class="text-md lg:text-2xl text-center font-bold">## WIP ##</p>
	<p class="text-xs lg:sm text-center pb-8">(working on the backend and the db)</p>
	<transition appear name="fade">
		<div
			class="transition-all duration-500 flex flex-col items-center pt-4"
			v-bind:class="{ 'transform translate-y-24': !gaFound, 'delay-700': gaFound }"
			id="welcome"
		>
			<div class="flex flex-col lg:flex-row px-4 items-center justify-center pb-8 gap-8 lg:gap-2">
				<div
					:class="gaFound ? 'opacity-100' : 'opacity-0'"
					class="text-4xl font-extrabold lg:pb-12 transition-all duration-500"
				>
					Welcome to
				</div>
				<GAText
					class="text-4xl font-extrabold text-center"
					target="WCHR.AUN"
					v-on:ga-found-target="toggle(true)"
					v-on:ga-reset="toggle(false)"
				/>
				<div
					:class="gaFound ? 'opacity-100' : 'opacity-0'"
					class="
						text-4xl
						font-extrabold
						lg:pb-12
						transition-all
						duration-1000
						text-center
						lg:text-left
					"
				>
					: my Personal Website
				</div>
			</div>
			<div class="py-8">
				<div
					class="text-4xl animate-bounce py-4 flex gap-2 transition-opacity duration-500"
					v-show="gaFound"
					v-bind:class="{ 'opacity-0': hideNavbar }"
				>
					<font-awesome-icon icon="angle-down" />
				</div>
			</div>
		</div>
	</transition>

	<div v-if="gaFound">
		<transition appear name="fade">
			<div
				class="pb-8 transition-opacity duration-1000 delay-1000"
				id="aboutme"
				ref="aboutme"
				v-bind:class="{ 'opacity-0': !gaFound }"
			>
				<AboutMe />
			</div>
		</transition>
		<hr class="p-4" />

		<div id="contact" ref="contact">
			<div
				class="transition-all duration-500 pb-8"
				v-bind:class="{ 'opacity-0 transform translate-y-4': !reachContactMe }"
			>
				<ContactMe />
			</div>
		</div>
		<hr class="p-4" />

		<div id="timeline" ref="timeline">
			<div
				class="transition-all duration-500 pb-8"
				v-bind:class="{ 'opacity-0 transform translate-y-4': !reachTimeline }"
			>
				<Timeline v-show="!reachTimeline" :list="timeline" />
			</div>
		</div>
	</div>

	<transition name="arrow-slide-fade">
		<div class="fixed bottom-16 right-2 lg:right-8 z-auto" v-if="hideNavbar">
			<Menu :menu="menu" v-on:to-menu="goTo($event)" />
		</div>
	</transition>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta';
import { defineComponent } from 'vue';
import { getProjectReadMe } from '@/api/github-readme';
import Timeline from '@/components/Timeline.vue';
import AboutMe from '@/components/AboutMe.vue';
import ContactMe from '@/components/ContactMe.vue';
import GAText from '@/components/GAText/GAText.vue';
import Menu from '@/components/Menu.vue';

export default defineComponent({
	setup() {
		useMeta({
			title: 'Home'
		});
	},
	name: 'Home',
	components: { Timeline, AboutMe, ContactMe, GAText, Menu },
	props: ['hideNavbar'],
	created() {
		window.addEventListener('scroll', this.dynamicContent);
	},
	unmounted() {
		window.removeEventListener('scroll', this.dynamicContent);
	},
	methods: {
		toggle(v: boolean) {
			this.gaFound = v;
		},
		goTo(v: string) {
			let el = this.$refs[v] as HTMLElement;
			el.scrollIntoView({ behavior: 'smooth' });
		},
		dynamicContent(): void {
			let contact = this.$refs.contact as HTMLElement;
			let timeline = this.$refs.timeline as HTMLElement;
			let height = screen.height;
			if (contact.getBoundingClientRect().y < height / 2) {
				this.reachContactMe = true;
			} else {
				this.reachContactMe = false;
			}
			if (timeline.getBoundingClientRect().y < height / 2) {
				this.reachTimeline = true;
			} else {
				this.reachTimeline = false;
			}
		}
	},
	data() {
		return {
			readme: 'placeholder here',
			menu: [
				{ label: 'About Me', val: 'aboutme' },
				{ label: 'Contact Me', val: 'contact' },
				{ label: 'Timeline', val: 'timeline' }
			],
			gaFound: false,
			reachContactMe: false,
			reachTimeline: false,
			timeline: [
				{
					position: 'left',
					title: 'Studied at KMUTT',
					message:
						'Being the first rank at the admission entrance in BE Computer Engineering, KMUTT.',
					hint: 'Aug 2016',
					icon: 'university',
					grid: 0,
					parent: true,
					cover: 'undergrad'
				},
				{
					position: 'right',
					title: 'Second Runner-Up, Thailand Open Hackathon 2017',
					message:
						'Solving big data problems in a limited time frame for the qualifying round. And analysing all given data and predicting the possible ways to improve the system for the final round.',
					hint: 'Jan 2018',
					icon: 'award',
					grid: 10,
					cover: 'undergrad'
				},
				{
					position: 'right',
					title: 'Worked at Extosoft',
					message: 'Worked at Extosoft as a part-time PHP developer',
					hint: 'Jun 2018 - Jul 2018',
					icon: 'briefcase',
					grid: 5,
					cover: 'undergrad'
				},
				{
					position: 'right',
					title: 'Internship at NTU',
					message: 'Internship at Nanyang Technological University as a Research Assistant',
					hint: 'Jun 2019 - Jul 2019',
					icon: 'briefcase',
					grid: 10,
					cover: 'undergrad'
				},
				{
					position: 'right',
					title: 'Semifinalist, National Software Contest 2020',
					message:
						"Building a marketplace application for trading recyclable wastes without needing the knowledge to use functions for checking waste types through a phone's camera. (Senior project related)",
					hint: 'Feb 2020',
					icon: 'award',
					grid: 10,
					cover: 'undergrad'
				},
				{
					position: 'right',
					title: 'Second Runner-Up, Best Senior Projects 2019',
					message:
						"Building a marketplace application for trading recyclable wastes without needing the knowledge to use functions for checking waste types through a phone's camera.",
					hint: 'Jun 2020',
					icon: 'award',
					grid: 4,
					cover: 'undergrad'
				},
				{
					position: 'left',
					title: 'Graduated from KMUTT',
					message:
						'Graduated with a second-class honour (GPAX 3.51/4.00).\nBeing among the top 15 students in the class during graduation.',
					hint: 'Jun 2020',
					icon: 'graduation-cap',
					grid: 2,
					parent: true,
					end: true,
					cover: 'undergrad'
				},
				{
					position: 'left',
					title: 'Worked at KBTG',
					message:
						'Started working at KBTG as a software engineer. Specifically worked on the frontend side of the project.',
					hint: 'Jul 2020',
					icon: 'briefcase',
					grid: 1,
					parent: true,
					cover: 'kbtg'
				},
				{
					position: 'right',
					title: 'Published a paper',
					message:
						'Published a conference paper called "The Relations Between Implementation Date of Policies and The Spreading of COVID-19"',
					more: 'https://ieeexplore.ieee.org/abstract/document/9245459/',
					hint: 'Jul 2020',
					icon: 'book',
					grid: 0,
					cover: 'kbtg'
				},
				{
					position: 'right',
					title: "Rank eighth, Thailand's Top Coder Competition #Javascript",
					message:
						'Solving 4 problems related to computational thinking, algorithms, and data structure. Being 1 in 11 people who got all the questions correct. The final ranking was ordered by how well the code was written.',
					more: 'https://jstopcoder.getlinks.com/',
					hint: 'Dec 2020',
					icon: 'award',
					grid: 5,
					cover: 'kbtg'
				},
				{
					position: 'left',
					title: 'Left KBTG',
					message: 'Left KBTG',
					hint: 'Dec 2020',
					icon: 'sign-out-alt',
					grid: 0,
					parent: true,
					end: true,
					cover: 'kbtg'
				},
				{
					position: 'left',
					title: 'Worked at Accenture',
					message:
						'Started working at Accenture Thailand as an application development analyst. Specifically worked on the frontend side of the project.',
					hint: 'Jan 2021',
					icon: 'briefcase',
					grid: 1,
					parent: true,
					cover: 'acn'
				},
				{
					position: 'left',
					title: 'Left Accenture',
					message: 'Left Accenture Thailand',
					hint: 'Jul 2021',
					icon: 'sign-out-alt',
					grid: 6,
					parent: true,
					end: true,
					cover: 'acn'
				},
				{
					position: 'left',
					title: 'Studying at the UoE',
					message: 'Studied MSc Computer Science at the University of Edinburgh',
					hint: 'Sep 2021',
					icon: 'university',
					grid: 2,
					parent: true,
					cover: 'uoe'
				},
				{
					position: 'left',
					title: 'To be graduate from the UoE',
					message: 'To be graduate from the University of Edinburgh',
					hint: 'Sep 2022',
					icon: 'graduation-cap',
					grid: 10,
					parent: true,
					end: true,
					cover: 'uoe'
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
