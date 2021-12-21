<template>
	<div class="p-2" @mouseleave="showMenu = false">
		<div class="flex flex-col items-end">
			<transition appear name="menu">
				<ul v-show="showMenu" class="bg-gray-500 rounded-md py-1 px-2 mb-2 text-sm">
					<li
						@click="goToTop()"
						class="text-gray-200 py-1 px-2 cursor-pointer text-center hover:text-gray-400"
					>
						Back to top
					</li>
					<li
						v-for="(item, idx) in menu"
						:key="item"
						class="text-gray-200 py-1 px-2 cursor-pointer text-center hover:text-gray-400"
						@click="onClick(item.val)"
						v-bind:class="{ 'border-b-2': idx !== menu.length - 1, 'border-t-2': idx === 0 }"
					>
						{{ item.label }}
					</li>
				</ul>
			</transition>
			<div
				@mouseover="showMenu = true"
				class="
					w-10
					h-10
					rounded-full
					bg-gray-500
					flex
					items-center
					justify-center
					cursor-pointer
					shadow-xl
					text-xl text-gray-200
				"
			>
				<font-awesome-icon class="-mt-0.5" icon="bars" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	props: ['menu'],
	data() {
		return { showMenu: false };
	},
	methods: {
		onClick(v: string): void {
			this.$emit('to-menu', v);
		},
		goToTop(): void {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
});
</script>

<style>
.menu-enter-active,
.menu-leave-active {
	transition: all 0.3s;
}
.menu-enter-from,
.menu-leave-to {
	transform: translateY(10%);
	opacity: 0;
}
</style>
