<template>
	<metainfo>
		<template v-slot:title="{ content }">{{
			content ? `${content} - ${SITE_NAME}` : SITE_NAME
		}}</template>
	</metainfo>
	<div class="bg-svg">
		<div class="flex flex-col min-h-screen">
			<Header />
			<div class="flex-grow p-2 md:p-8 text-gray-200">
				<router-view />
			</div>
			<Footer />
		</div>
	</div>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta';
import { defineComponent } from 'vue';
import { auth } from '@/firebase';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
	setup() {
		useMeta({
			title: 'Home'
		});
	},
	name: 'App',
	components: { Header, Footer },
	created() {
		auth.onAuthStateChanged((user) => {
			if (!user) return;
			this.store.methods.login();
			this.store.methods.setUser(user.email || '');
		});
	},
	data() {
		return {
			SITE_NAME: 'wchr-aun'
		};
	}
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
body {
	font-family: 'Montserrat', sans-serif !important;
}
.bg-svg {
	background-image: url('./assets/bg.svg');
}
</style>
