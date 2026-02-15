import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="wrap-menu-header gradient1 trans-0-4">
        <div className="container h-full">
          <div className="wrap_header trans-0-3">
            <div className="logo">
              <Link href="/">
                <img src="/images/icons/logo.png" alt="IMG-LOGO" data-logofixed="/images/icons/logo2.png" />
              </Link>
            </div>

            <div className="wrap_menu p-l-45 p-l-0-xl">
              <nav className="menu">
                <ul className="main_menu">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/menu">Menu</Link></li>
                  <li><Link href="/reservation">Reservation</Link></li>
                  <li><Link href="/gallery">Gallery</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>

            <div className="social flex-w flex-l-m p-r-20">
              <a href="#"><i className="fa fa-tripadvisor" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-facebook m-l-21" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-twitter m-l-21" aria-hidden="true"></i></a>
              <button className="btn-show-sidebar m-l-33 trans-0-4" type="button" aria-label="Abrir menú"></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
