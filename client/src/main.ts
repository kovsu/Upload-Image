import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMountain, faSun, faMoon, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faMountain, faSun, faMoon, faGithub, faCloudArrowUp);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
