import * as Webtask from "webtask-tools";
import App from "./src/App";
require('dotenv').config();

module.exports = Webtask.fromExpress(App);
