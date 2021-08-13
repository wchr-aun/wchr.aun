import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createMetaManager } from "vue-meta";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import Home from "./views/Home.vue";
import "./index.css";

library.add(fas, faGithub, faLinkedin);

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: Home }],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash };
    }
  },
});

const app = createApp(App);

app.use(router);
app.use(createMetaManager());
app.component("font-awesome-icon", FontAwesomeIcon);

await router.isReady();
app.mount("#app");
