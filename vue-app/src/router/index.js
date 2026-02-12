import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuView from "../views/MenuView.vue";
import GalleryView from "../views/GalleryView.vue";
import AboutView from "../views/AboutView.vue";
import BlogView from "../views/BlogView.vue";
import ContactView from "../views/ContactView.vue";
import ReservationView from "../views/ReservationView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/menu", name: "menu", component: MenuView },
  { path: "/gallery", name: "gallery", component: GalleryView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/blog", name: "blog", component: BlogView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/reservation", name: "reservation", component: ReservationView },
  { path: "/login", name: "login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

