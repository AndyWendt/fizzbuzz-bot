import * as Webtask from "webtask-tools";
import App from "./src/App";

module.exports = Webtask.fromExpress(App);
