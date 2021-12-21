<template>
	<div class="space-mono flex flex-col">
		<div :class="clazz">{{ population.getBest() || initText }}</div>
		<div class="flex gap-4 justify-center pt-4">
			<button
				class="py-1 rounded-md bg-gray-200 text-gray-800 text-center w-32 cursor-pointer"
				:class="population.isFinished() ? 'bg-gray-400 cursor-not-allowed' : 'animate-bounce'"
				:disabled="population.isFinished()"
				@click="evolve()"
			>
				<span :class="!population.isFinished() ? 'text-gray-800' : 'text-gray-200'"> Evolve! </span>
			</button>
			<button
				class="py-1 rounded-md bg-gray-200 text-gray-800 text-center w-32 cursor-pointer"
				v-bind:class="{ 'bg-gray-400 cursor-not-allowed': !population.getBest() }"
				:disabled="!population.getBest()"
				@click="reset()"
			>
				<span :class="population.getBest() ? 'text-gray-800' : 'text-gray-200'"> Reset </span>
			</button>
		</div>
		<div>
			<transition appear name="fade">
				<p class="text-xs ml-28 mt-4 absolute" v-if="!population.isFinished()">
					<ExternalLink
						link="https://github.com/wchr-aun/ga-search-string"
						text="(Genetic Algorithm)"
					/>
				</p>
			</transition>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { Population } from './Population';
import ExternalLink from '@/components/ExternalLink.vue';

export default defineComponent({
	name: 'GAText',
	props: {
		target: String,
		class: String
	},
	components: { ExternalLink },
	data() {
		return {
			clazz: this.class,
			initText: '_'.repeat(this.target.length),
			text: '_'.repeat(this.target.length),
			population: new Population(this.target, 1, 0.01, 200),
			triggered: false
		};
	},
	methods: {
		async evolve() {
			for (let i = 0; i < 50; i++) {
				setTimeout(() => {
					if (this.population.isFinished()) {
						this.emit();
						return;
					}
					this.population.naturalSelection();
					this.population.generate();
					this.population.calcFitness();
					this.population.evaluate();
				}, 100);
			}
		},
		reset() {
			this.triggered = false;
			this.population = new Population(this.target, 1, 0.01, 200);
			this.$emit('ga-reset');
		},
		emit() {
			if (this.triggered) return;
			this.triggered = true;
			this.$emit('ga-found-target');
		}
	}
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
.space-mono {
	font-family: 'Space Mono', monospace;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
