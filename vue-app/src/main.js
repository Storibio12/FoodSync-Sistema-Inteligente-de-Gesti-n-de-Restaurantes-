import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Bootstrap y estilos del tema se cargan desde index.html (vendor/css del proyecto raíz)

const app = createApp(App);
app.use(router);
app.mount("#app");

// Cargar scripts del tema después del montaje (sidebar, lightbox, back-to-top, etc.)
const themeScripts = [
  "/vendor/jquery/jquery-3.2.1.min.js",
  "/vendor/animsition/js/animsition.min.js",
  "/vendor/bootstrap/js/popper.js",
  "/vendor/bootstrap/js/bootstrap.min.js",
  "/vendor/select2/select2.min.js",
  "/vendor/daterangepicker/moment.min.js",
  "/vendor/daterangepicker/daterangepicker.js",
  "/vendor/slick/slick.min.js",
  "/js/slick-custom.js",
  "/vendor/parallax100/parallax100.js",
  "/vendor/countdowntime/countdowntime.js",
  "/vendor/lightbox2/js/lightbox.min.js",
  "/js/main.js",
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

(async () => {
  for (const src of themeScripts) {
    try {
      await loadScript(src);
    } catch (e) {
      console.warn("No se pudo cargar el script del tema:", src, e);
    }
  }
  if (typeof window.$ !== "undefined" && window.$.fn.parallax100) {
    window.$(".parallax100").parallax100();
  }
})();
