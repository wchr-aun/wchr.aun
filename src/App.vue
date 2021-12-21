<template>
	<metainfo>
		<template v-slot:title="{ content }">{{
			content ? `${content} - ${SITE_NAME}` : SITE_NAME
		}}</template>
	</metainfo>
	<div class="bg-svg">
		<div class="flex flex-col min-h-screen">
			<transition name="nav-fade">
				<div v-if="!hideNavbar" class="w-full fixed">
					<Header />
				</div>
			</transition>
			<div class="flex-grow p-2 md:p-8 text-gray-200 mt-32">
				<router-view :hideNavbar="hideNavbar" />
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
		window.addEventListener('scroll', this.dynamicNavbar);
	},
	unmounted() {
		window.removeEventListener('scroll', this.dynamicNavbar);
	},
	data() {
		return {
			SITE_NAME: 'wchr-aun',
			hideNavbar: false
		};
	},
	methods: {
		dynamicNavbar(): void {
			if (window.scrollY > 50) {
				this.hideNavbar = true;
			} else {
				this.hideNavbar = false;
			}
		}
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
	background-attachment: fixed;
}

.arrow-slide-fade-enter-active {
	transition: all 0.5s ease-out;
}
.arrow-slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 1, 1, 1);
}
.arrow-slide-fade-enter-from,
.arrow-slide-fade-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}

.nav-fade-enter-active {
	transition: all 0.5s ease-out;
}
.nav-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 1, 1, 1);
}
.nav-fade-enter-from,
.nav-fade-leave-to {
	transform: translateY(-8rem);
	opacity: 0;
}
</style>
