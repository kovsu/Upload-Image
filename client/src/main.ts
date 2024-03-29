import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import { router } from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faMountain,
  faSun,
  faMoon,
  faCloudArrowUp,
  faMinus,
  faUpload,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faMountain,
  faSun,
  faMoon,
  faGithub,
  faCloudArrowUp,
  faMinus,
  faUpload,
  faCheck
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
