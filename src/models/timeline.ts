export interface EventList {
	position: string;
	title: string;
	message: string;
	hint: string;
	icon: string;
	grid: number;
	condense?: boolean;
	cover?: string;
	parent?: boolean;
	end?: boolean;
}
