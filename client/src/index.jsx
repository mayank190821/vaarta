import React from "react";
import {createRoot} from "react-dom/client";
import AppRouter from "./appRouter";

const root = createRoot(document.getElementById("root"))
root.render(
    <AppRouter/>
);
