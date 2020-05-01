import React, { useEffect } from "react";
import * as firebase from "firebase";

import Routes from "./src/routes";
const firebaseConfig = require("./src/config/firebaseConfig");

export default function App() {
  return <Routes />;
}
