import React from "react";
import { createRoot } from "react-dom/client";
import Wrapper from "./Sections";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);
const root = createRoot(document.getElementById("root")!);

root.render(<Wrapper />);
