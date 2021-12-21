import { Genetics } from './Genetics';

export class Population {
	population: Genetics[];
	matingPool: Genetics[];
	generations: number;
	finished: boolean;
	target: string;
	crossoverRate: number;
	mutationRate: number;
	perfectScore: number;
	best: string;

	constructor(p: string, c: number, m: number, num: number) {
		this.population = [];
		this.matingPool = [];
		this.generations = 0;
		this.finished = false;
		this.target = p;
		this.crossoverRate = c;
		this.mutationRate = m;
		this.perfectScore = 1;

		this.best = '';

		this.population = [];
		for (let i = 0; i < num; i++) {
			this.population[i] = new Genetics(this.target.length, this.crossoverRate, this.mutationRate);
		}
		this.matingPool = [];
		this.calcFitness();
	}

	calcFitness(): void {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].calcFitness(this.target);
		}
	}

	naturalSelection(): void {
		this.matingPool = [];

		let maxFitness = 0;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > maxFitness) {
				maxFitness = this.population[i].fitness;
			}
		}

		for (let i = 0; i < this.population.length; i++) {
			const fitness = this.population[i].fitness / maxFitness;
			const n = Math.floor(fitness * 100);
			for (let j = 0; j < n; j++) {
				this.matingPool.push(this.population[i]);
			}
		}
	}

	generate(): void {
		for (let i = 0; i < this.population.length; i++) {
			const a = Math.floor(Math.random() * this.matingPool.length);
			const b = Math.floor(Math.random() * this.matingPool.length);
			const partnerA = this.matingPool[a];
			const partnerB = this.matingPool[b];
			const child = partnerA.crossover(partnerB);
			child.mutate();
			this.population[i] = child;
		}
		this.generations++;
	}

	getBest(): string {
		return this.best;
	}

	evaluate(): void {
		let worldrecord = 0.0;
		let index = 0;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > worldrecord) {
				index = i;
				worldrecord = this.population[i].fitness;
			}
		}

		this.best = this.population[index].getPhrase();
		if (worldrecord === this.perfectScore) {
			this.finished = true;
		}
	}

	isFinished(): boolean {
		return this.finished;
	}

	getGenerations(): number {
		return this.generations;
	}

	getAverageFitness(): number {
		let total = 0;
		for (let i = 0; i < this.population.length; i++) {
			total += this.population[i].fitness;
		}
		return total / this.population.length;
	}

	allPhrases(): string {
		let everything = '';

		const displayLimit = Math.min(this.population.length, 50);

		for (let i = 0; i < displayLimit; i++) {
			everything += this.population[i].getPhrase() + '<br>';
		}
		return everything;
	}
}
