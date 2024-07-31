import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import electron from "vite-plugin-electron";

const app = createApp(App);

app.mount("#app");
