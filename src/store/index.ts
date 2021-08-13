import { reactive, readonly } from 'vue';

const state = reactive({
	loggedIn: false,
	user: ''
});

const methods = {
	login: () => (state.loggedIn = true),
	logout: () => (state.loggedIn = false),
	setUser: (user: string) => (state.user = user)
};

export default {
	state: readonly(state),
	methods: readonly(methods)
};
