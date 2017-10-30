// was getting a "ReferenceError: regeneratorRuntime is not defined" error
// requiring 'babel-polyfill' was the quick fix
require('babel-polyfill');

import * as Webtask from "webtask-tools";
import App from "./src/App";

module.exports = Webtask.fromExpress(App);
