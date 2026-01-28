<template>
  <div class="app">
    <header class="topbar">
      <nav class="nav">
        <RouterLink to="/" class="nav-logo">Pato Place</RouterLink>
        <ul class="nav-links">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/menu">Menu</RouterLink></li>
          <li><RouterLink to="/reservation">Reservation</RouterLink></li>
          <li><RouterLink to="/gallery">Gallery</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </nav>
    </header>

    <main class="page">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: #0b1120;
  color: #e5e7eb;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(30, 64, 175, 0.9));
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.nav {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.nav-logo {
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fbbf24;
  text-decoration: none;
  font-size: 0.95rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
}

.nav-links a {
  color: #e5e7eb;
  text-decoration: none;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
}

.nav-links a.router-link-active {
  background: rgba(248, 250, 252, 0.12);
  color: #fbbf24;
}

.nav-links a:hover {
  background: rgba(15, 23, 42, 0.6);
  transform: translateY(-1px);
}

.page {
  flex: 1;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  padding: 1.75rem 1.25rem 2.5rem;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
