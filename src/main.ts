import { createApp } from "vue";
import { createMetaManager } from "vue-meta";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import "./index.css";

library.add(fas, faGithub, faLinkedin);

const app = createApp(App);

app.use(router);
app.use(createMetaManager());
app.component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
  app.mount("#app");
});
