import { reactive, readonly } from 'vue';

const state = reactive({
	loggedIn: false,
	user: '',
	role: ''
});

const methods = {
	login: () => (state.loggedIn = true),
	logout: () => {
		state.loggedIn = false;
		state.user = '';
	},
	setUser: (user: string) => (state.user = user)
};

export default {
	state: readonly(state),
	methods: readonly(methods)
};
