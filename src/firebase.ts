import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseApp = initializeApp({
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_PROJECT_ID,
	appId: process.env.VUE_APP_APP_ID
});

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
