import { App } from "./App";

function __run() {
    const app = new App(document.getRootNode());
    app.run();
}

document.addEventListener("DOMContentLoaded", __run);