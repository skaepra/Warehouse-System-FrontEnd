import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { HashRouter } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./shared/components/ScrollToTop";

// الحصول على عنصر الـ root من ملف HTML
const rootElement = document.getElementById("root");

// التأكد من أن العنصر موجود لمنع أخطاء TypeScript (Null Check)
if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Make sure index.html has a <div id='root'></div>",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <HashRouter >
        <ScrollToTop />
        <Layout />
      </HashRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
