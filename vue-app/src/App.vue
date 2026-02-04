<template>
  <div class="app animsition">
    <!-- Header -->
    <header>
      <div class="wrap-menu-header gradient1 trans-0-4">
        <div class="container h-full">
          <div class="wrap_header trans-0-3">
            <div class="logo">
              <RouterLink to="/">
                <img src="/images/icons/logo2.png" alt="IMG-LOGO" data-logofixed="/images/icons/logo.png" />
              </RouterLink>
            </div>
            <div class="wrap_menu p-l-45 p-l-0-xl">
              <nav class="menu">
                <ul class="main_menu">
                  <li><RouterLink to="/">Home</RouterLink></li>
                  <li><RouterLink to="/menu">Menu</RouterLink></li>
                  <li><RouterLink to="/reservation">Reservation</RouterLink></li>
                  <li><RouterLink to="/gallery">Gallery</RouterLink></li>
                  <li><RouterLink to="/about">About</RouterLink></li>
                  <li><RouterLink to="/blog">Blog</RouterLink></li>
                  <li><RouterLink to="/contact">Contact</RouterLink></li>
                </ul>
              </nav>
            </div>
            <div class="social flex-w flex-l-m p-r-20">
              <a href="#"><i class="fa fa-tripadvisor" aria-hidden="true"></i></a>
              <a href="#"><i class="fa fa-facebook m-l-21" aria-hidden="true"></i></a>
              <a href="#"><i class="fa fa-twitter m-l-21" aria-hidden="true"></i></a>
              <button class="btn-show-sidebar m-l-33 trans-0-4" type="button" aria-label="Abrir menú"></button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar trans-0-4">
      <button class="btn-hide-sidebar ti-close color0-hov trans-0-4" type="button" aria-label="Cerrar menú"></button>
      <ul class="menu-sidebar p-t-95 p-b-70">
        <li class="t-center m-b-13"><RouterLink to="/" class="txt19">Home</RouterLink></li>
        <li class="t-center m-b-13"><RouterLink to="/menu" class="txt19">Menu</RouterLink></li>
        <li class="t-center m-b-13"><RouterLink to="/gallery" class="txt19">Gallery</RouterLink></li>
        <li class="t-center m-b-13"><RouterLink to="/about" class="txt19">About</RouterLink></li>
        <li class="t-center m-b-13"><RouterLink to="/blog" class="txt19">Blog</RouterLink></li>
        <li class="t-center m-b-33"><RouterLink to="/contact" class="txt19">Contact</RouterLink></li>
        <li class="t-center">
          <RouterLink to="/reservation" class="btn3 flex-c-m size13 txt11 trans-0-4 m-l-r-auto">Reservation</RouterLink>
        </li>
      </ul>
      <div class="gallery-sidebar t-center p-l-60 p-r-60 p-b-40">
        <h4 class="txt20 m-b-33">Gallery</h4>
        <div class="wrap-gallery-sidebar flex-w">
          <a class="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-01.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-01.jpg" alt="GALLERY" />
          </a>
          <a class="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-02.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-02.jpg" alt="GALLERY" />
          </a>
          <a class="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-03.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-03.jpg" alt="GALLERY" />
          </a>
          <a class="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-09.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-09.jpg" alt="GALLERY" />
          </a>
          <a class="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-10.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-10.jpg" alt="GALLERY" />
          </a>
          <a class="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-11.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-11.jpg" alt="GALLERY" />
          </a>
        </div>
      </div>
    </aside>

    <main class="page-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg1">
      <div class="container p-t-40 p-b-70">
        <div class="row">
          <div class="col-sm-6 col-md-4 p-t-50">
            <h4 class="txt13 m-b-38">Gallery</h4>
            <div class="wrap-gallery-footer flex-w">
              <a class="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-01.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-01.jpg" alt="GALLERY" />
              </a>
              <a class="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-02.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-02.jpg" alt="GALLERY" />
              </a>
              <a class="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-03.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-03.jpg" alt="GALLERY" />
              </a>
              <a class="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-09.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-09.jpg" alt="GALLERY" />
              </a>
              <a class="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-10.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-10.jpg" alt="GALLERY" />
              </a>
              <a class="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-11.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-11.jpg" alt="GALLERY" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="end-footer bg2">
        <div class="container">
          <div class="flex-sb-m flex-w p-t-22 p-b-22">
            <div class="p-t-5 p-b-5">
              <a href="#" class="fs-15 c-white"><i class="fa fa-tripadvisor" aria-hidden="true"></i></a>
              <a href="#" class="fs-15 c-white"><i class="fa fa-facebook m-l-18" aria-hidden="true"></i></a>
              <a href="#" class="fs-15 c-white"><i class="fa fa-twitter m-l-18" aria-hidden="true"></i></a>
            </div>
            <div class="txt17 p-r-20 p-t-5 p-b-5">
              Copyright &copy; 2018 All rights reserved | This template is made with <i class="fa fa-heart"></i> by
              <a href="https://colorlib.com" target="_blank" rel="noopener">Colorlib</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="btn-back-to-top bg0-hov" id="myBtn">
      <span class="symbol-btn-back-to-top">
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.page-content {
  flex: 1;
}
</style>
