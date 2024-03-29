<template>
	<div class="pb-4 flex items-center gap-2">
		<router-link class="uppercase text-2xl font-bold" to="#timeline"> # Timeline </router-link>
		<div v-if="resetNeeded" class="text-xs cursor-pointer text-gray-400" @click="resetToggle()">
			(reset toggle)
		</div>
	</div>
	<div class="container mx-auto w-full h-full">
		<div class="relative wrap overflow-hidden h-full">
			<div
				class="border-2-2 absolute border-opacity-20 border-gray-400 h-full border"
				style="left: 50%"
			></div>
			<template v-for="item in events" :key="item">
				<transition appear :name="item.parent ? 'parent-fade' : 'slide-fade'">
					<div
						v-bind:class="{
							hidden:
								!(extend.get(item.cover) || item.parent) || !(!item.end || !extend.get(item.cover))
						}"
						v-show="
							(extend.get(item.cover) || item.parent) && (!item.end || !extend.get(item.cover))
						"
					>
						<div
							class="flex justify-between items-center w-full"
							:class="`pb-${gridLength(item)} pt-${gridLength(item)}`"
						>
							<template v-if="item.end && !extend.get(item.cover)">
								<div class="order-1 w-5/12"></div>
								<div
									class="
										z-10
										flex
										items-center
										order-1
										cursor-pointer
										border-2
										w-8
										h-8
										rounded-full
										ml-0.5
									"
									@click="toggle(item.cover)"
								>
									<span class="mx-auto font-semibold text-lg text-gray-200">
										<font-awesome-icon icon="angle-down" />
									</span>
								</div>
								<div class="order-1 w-5/12"></div>
							</template>
						</div>
						<div
							class="mt-8 mb-8 flex justify-between items-center w-full"
							v-bind:class="{
								'flex-row-reverse': item.position === 'left'
							}"
						>
							<div class="order-1 w-5/12">
								<p
									class="text-gray-200 text-xs"
									v-bind:class="{
										'text-right': item.position === 'right'
									}"
								>
									{{ item.hint }}
								</p>
							</div>
							<div
								class="z-10 flex items-center order-1 bg-gray-200 shadow-xl w-8 h-8 rounded-full"
								v-bind:class="{
									'cursor-pointer': item.parent && !item.end && extend.get(item.cover)
								}"
								@click="item.parent && !item.end && extend.get(item.cover) && toggle(item.cover)"
							>
								<span
									class="mx-auto font-semibold text-lg text-gray-800"
									v-bind:class="{ 'animate-bounce mt-2': item.parent && extend.get(item.cover) }"
								>
									<font-awesome-icon
										:icon="item.parent && extend.get(item.cover) ? 'angle-up' : item.icon"
									/>
								</span>
							</div>
							<div
								class="order-1 bg-gray-100 opacity-80 rounded-lg shadow-xl w-5/12 px-6 py-4 h-full"
							>
								<h3 class="lg:mb-3 font-bold text-gray-800 text-sm lg:text-xl">
									{{ item.title }}
								</h3>
								<p
									class="
										text-sm
										leading-snug
										tracking-wide
										text-gray-900 text-opacity-100
										whitespace-pre-line
										hidden
										lg:block
									"
								>
									{{ item.message }}
									<template v-if="item.more">
										<a class="text-xs underline text-blue-500" v-bind:href="item.more">more...</a>
									</template>
								</p>
							</div>
						</div>
					</div>
				</transition>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EventList } from '@/models/timeline';

export default defineComponent({
	name: 'Timeline',
	props: {
		list: {
			type: Array as PropType<EventList[]>,
			required: true
		}
	},
	data() {
		let extend = new Map();
		Array.from(new Set(this.list.map((v) => v.cover))).forEach((v) => {
			extend.set(v, false);
		});
		let events = this.list.flatMap((v) =>
			v.end
				? [
						{ ...v, position: 'right', parent: false, end: false },
						{ ...v, grid: 0 }
				  ]
				: v
		);
		return { extend, events };
	},
	computed: {
		resetNeeded(): boolean {
			return !Array.from(this.extend.values()).every((v) => !v);
		}
	},
	methods: {
		toggle(cover: string): void {
			this.extend.set(cover, !this.extend.get(cover));
		},
		gridLength(item: EventList): number {
			return !this.extend.get(item.cover) && item.end ? 2 : item.grid * 2;
		},
		resetToggle(): void {
			for (const [key, _] of this.extend.entries()) this.extend.set(key, false);
		}
	}
});
</script>

<style>
.slide-fade-enter-active {
	transition: all 1s ease-out;
}
.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 1, 1, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(-100%);
	opacity: 0;
}

.parent-fade-enter-active {
	transition: all 1s ease-out;
}
.parent-fade-leave-active {
	transition: all 0ms;
}
.parent-fade-leave-to {
	opacity: 0;
}
.parent-fade-enter-from {
	transform: translateY(40%);
	opacity: 0;
}
</style>
