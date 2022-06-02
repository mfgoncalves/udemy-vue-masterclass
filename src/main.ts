import App from "@/App.vue";
import "@/assets/tailwind.css";
import router from "@/router";
import store from "@/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";

library.add(faAngleUp);
library.add(faAngleDown);
library.add(faSearch);

createApp(App)
  .use(store)
  .use(router)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .mount("#app");