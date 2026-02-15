import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar trans-0-4">
      <button className="btn-hide-sidebar ti-close color0-hov trans-0-4" type="button" aria-label="Cerrar menú"></button>

      <ul className="menu-sidebar p-t-95 p-b-70">
        <li className="t-center m-b-13">
          <Link href="/" className="txt19">Home</Link>
        </li>
        <li className="t-center m-b-13">
          <Link href="/menu" className="txt19">Menu</Link>
        </li>
        <li className="t-center m-b-13">
          <Link href="/gallery" className="txt19">Gallery</Link>
        </li>
        <li className="t-center m-b-13">
          <Link href="/about" className="txt19">About</Link>
        </li>
        <li className="t-center m-b-13">
          <Link href="/blog" className="txt19">Blog</Link>
        </li>
        <li className="t-center m-b-33">
          <Link href="/contact" className="txt19">Contact</Link>
        </li>
        <li className="t-center">
          <Link href="/reservation" className="btn3 flex-c-m size13 txt11 trans-0-4 m-l-r-auto">
            Reservation
          </Link>
        </li>
      </ul>

      <div className="gallery-sidebar t-center p-l-60 p-r-60 p-b-40">
        <h4 className="txt20 m-b-33">Gallery</h4>
        <div className="wrap-gallery-sidebar flex-w">
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-01.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-01.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-02.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-02.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-03.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-03.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-05.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-05.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-06.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-06.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-07.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-07.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-09.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-09.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-10.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-10.jpg" alt="GALLERY" />
          </a>
          <a className="item-gallery-sidebar wrap-pic-w" href="/images/photo-gallery-11.jpg" data-lightbox="gallery-footer">
            <img src="/images/photo-gallery-thumb-11.jpg" alt="GALLERY" />
          </a>
        </div>
      </div>
    </aside>
  );
}
