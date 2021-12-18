<template>
	<div class="relative h-32 bg-gray-600 opacity-90 text-gray-200 flex items-center justify-center">
		<div class="absolute left-10 bottom-2 text-sm flex gap-4">
			<router-link to="/">Home</router-link>
			<router-link to="/mytimetable" v-if="user === 'anaunz@gmail.com'">MyTimetable</router-link>
		</div>
		<div
			class="uppercase text-4xl font-bold select-none underline cursor-pointer"
			@click="clickDomain"
		>
			wchr-aun
		</div>
		<div class="absolute right-2 top-2 text-xs" v-if="loggedIn">Logged In As: {{ user }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return { domainClicks: 0 };
	},
	computed: {
		loggedIn() {
			return this.store.state.loggedIn;
		},
		user() {
			return this.store.state.user;
		}
	},
	methods: {
		clickDomain() {
			this.domainClicks++;
			if (this.$router.currentRoute.value.path === '/login') {
				this.$router.push('/');
				return;
			}
			if (this.domainClicks > 3) {
				this.domainClicks = 0;
				this.$router.push('/login');
				return;
			}
		}
	}
});
</script>
