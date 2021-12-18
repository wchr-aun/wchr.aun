<template>
	<div class="pb-4">
		<router-link class="uppercase text-2xl font-bold" to="#timeline"> # Timeline </router-link>
	</div>
	<div class="container mx-auto w-full h-full">
		<div class="relative wrap overflow-hidden h-full">
			<div
				class="border-2-2 absolute border-opacity-20 border-gray-400 h-full border"
				style="left: 50%"
			></div>
			<template v-for="item in list" :key="item">
				<template v-if="item.grid !== 0">
					<div
						v-for="idx in item.grid"
						:key="idx"
						class="mb-8 flex justify-between items-center w-full"
					>
						<template v-if="item.condense && idx === Math.floor(item.grid / 2)">
							<div class="order-1 w-5/12"></div>
							<div class="z-10 flex items-center order-1">
								<span class="mx-auto font-semibold text-lg text-gray-200 pl-0.5">
									<font-awesome-icon icon="ellipsis-v" />
								</span>
							</div>
							<div class="order-1 w-5/12"></div>
						</template>
					</div>
				</template>
				<div
					class="mb-8 flex justify-between items-center w-full"
					v-bind:class="{ 'flex-row-reverse': item.position === 'left' }"
				>
					<div class="order-1 w-5/12">
						<p
							class="text-gray-200 text-xs"
							v-bind:class="{ 'text-right': item.position === 'right' }"
						>
							{{ item.hint }}
						</p>
					</div>
					<div class="z-10 flex items-center order-1 bg-gray-200 shadow-xl w-8 h-8 rounded-full">
						<span class="mx-auto font-semibold text-lg text-gray-800">
							<font-awesome-icon :icon="item.icon" />
						</span>
					</div>
					<div class="order-1 bg-gray-100 opacity-80 rounded-lg shadow-xl w-5/12 px-6 py-4 h-full">
						<h3 class="mb-3 font-bold text-gray-800 text-xl">
							{{ item.title }}
						</h3>
						<p
							class="
								text-sm
								leading-snug
								tracking-wide
								text-gray-900 text-opacity-100
								whitespace-pre-line
							"
						>
							{{ item.message }}
							<template v-if="item.more">
								<a class="text-xs underline text-blue-500" v-bind:href="item.more">more...</a>
							</template>
						</p>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Timeline',
	props: ['list', 'totalGrid']
};
</script>
