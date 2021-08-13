<template>
	<div class="flex justify-center">
		<button class="bg-white text-gray-800 p-4 border rounded-md" v-if="!loggedIn" @click="login()">
			Login with Google
		</button>
		<button class="bg-white text-gray-800 p-4 border rounded-md" v-if="loggedIn" @click="logout()">
			Log Out
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase';

export default defineComponent({
	computed: {
		loggedIn() {
			return this.store.state.loggedIn;
		}
	},
	methods: {
		login() {
			signInWithPopup(auth, provider).catch((err) => {
				console.log(err);
			});
		},
		logout() {
			this.store.methods.logout();
			auth.signOut();
		}
	}
});
</script>
