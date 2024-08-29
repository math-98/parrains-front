import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import axios from "axios";
import store from "./store";

import "./assets/app.scss";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
