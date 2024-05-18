import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// vue-router
import { router } from "@/router.js";
app.use(router);

// vue-final-modal
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";
const vfm = createVfm();
app.use(vfm);

// vue3-toastify
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
app.use(Vue3Toasity);

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faCartShopping,
  faPenNib,
  faUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
const iconst = [faCartShopping, faHouse, faComment, faPenNib, faUser];
app.component("font-awesome-icon", FontAwesomeIcon, ...iconst);
library.add(...iconst);

app.mount("#app");
