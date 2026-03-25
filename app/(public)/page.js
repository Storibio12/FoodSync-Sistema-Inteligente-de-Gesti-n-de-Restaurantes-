import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="section-slide">
        <div className="wrap-slick1">
          <div className="slick1">
            <div className="item-slick1 item1-slick1" style={{ backgroundImage: "url(/images/slide1-01.jpg)" }}>
              <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                <span className="caption1-slide1 txt1 t-center animated visible-false m-b-15" data-appear="fadeInDown">Welcome to</span>
                <h2 className="caption2-slide1 tit1 t-center animated visible-false m-b-37" data-appear="fadeInUp">FoodSync</h2>
                <div className="wrap-btn-slide1 animated visible-false" data-appear="zoomIn">
                  <Link href="/menu" className="btn1 flex-c-m size1 txt3 trans-0-4">Look Menu</Link>
                </div>
              </div>
            </div>
            <div className="item-slick1 item2-slick1" style={{ backgroundImage: "url(/images/master-slides-02.jpg)" }}>
              <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                <span className="caption1-slide1 txt1 t-center animated visible-false m-b-15" data-appear="rollIn">Welcome to</span>
                <h2 className="caption2-slide1 tit1 t-center animated visible-false m-b-37" data-appear="lightSpeedIn">FoodSync</h2>
                <div className="wrap-btn-slide1 animated visible-false" data-appear="slideInUp">
                  <Link href="/menu" className="btn1 flex-c-m size1 txt3 trans-0-4">Look Menu</Link>
                </div>
              </div>
            </div>
            <div className="item-slick1 item3-slick1" style={{ backgroundImage: "url(/images/master-slides-01.jpg)" }}>
              <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                <span className="caption1-slide1 txt1 t-center animated visible-false m-b-15" data-appear="rotateInDownLeft">Welcome to</span>
                <h2 className="caption2-slide1 tit1 t-center animated visible-false m-b-37" data-appear="rotateInUpRight">FoodSync</h2>
                <div className="wrap-btn-slide1 animated visible-false" data-appear="rotateIn">
                  <Link href="/menu" className="btn1 flex-c-m size1 txt3 trans-0-4">Look Menu</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap-slick1-dots"></div>
        </div>
      </section>

      <section className="section-welcome bg1-pattern p-t-120 p-b-105">
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-t-45 p-b-30">
              <div className="wrap-text-welcome t-center">
                <span className="tit2 t-center">FoodSync Restaurant</span>
                <h3 className="tit3 t-center m-b-35 m-t-5">Welcome</h3>
                <p className="t-center m-b-22 size3 m-l-r-auto">
                  Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed fringilla, nunc sed imperdiet lacinia, nisl ante egestas mi, ac facilisis ligula sem id neque.
                </p>
                <Link href="/about" className="txt4">
                  Our Story
                  <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-6 p-b-30">
              <div className="wrap-pic-welcome size2 bo-rad-10 hov-img-zoom m-l-r-auto">
                <img src="/images/our-story-01.jpg" alt="IMG-OUR" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-intro">
        <div className="header-intro parallax100 t-center p-t-135 p-b-158" style={{ backgroundImage: "url(/images/bg-intro-01.jpg)" }}>
          <span className="tit2 p-l-15 p-r-15">Discover</span>
          <h3 className="tit4 t-center p-l-15 p-r-15 p-t-3">FoodSync</h3>
        </div>
        <div className="content-intro bg-white p-t-77 p-b-133">
          <div className="container">
            <div className="row">
              <div className="col-md-4 p-t-30">
                <div className="blo1">
                  <div className="wrap-pic-blo1 bo-rad-10 hov-img-zoom">
                    <a href="#"><img src="/images/intro-01.jpg" alt="IMG-INTRO" /></a>
                  </div>
                  <div className="wrap-text-blo1 p-t-35">
                    <a href="#"><h4 className="txt5 color0-hov trans-0-4 m-b-13">Romantic Restaurant</h4></a>
                    <p className="m-b-20">Phasellus lorem enim, luctus ut velit eget, con-vallis egestas eros.</p>
                    <a href="#" className="txt4">Learn More <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-t-30">
                <div className="blo1">
                  <div className="wrap-pic-blo1 bo-rad-10 hov-img-zoom">
                    <a href="#"><img src="/images/intro-02.jpg" alt="IMG-INTRO" /></a>
                  </div>
                  <div className="wrap-text-blo1 p-t-35">
                    <a href="#"><h4 className="txt5 color0-hov trans-0-4 m-b-13">Delicious Food</h4></a>
                    <p className="m-b-20">Aliquam eget aliquam magna, quis posuere risus ac justo ipsum nibh urna</p>
                    <a href="#" className="txt4">Learn More <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-t-30">
                <div className="blo1">
                  <div className="wrap-pic-blo1 bo-rad-10 hov-img-zoom">
                    <a href="#"><img src="/images/intro-04.jpg" alt="IMG-INTRO" /></a>
                  </div>
                  <div className="wrap-text-blo1 p-t-35">
                    <a href="#"><h4 className="txt5 color0-hov trans-0-4 m-b-13">Red Wines You Love</h4></a>
                    <p className="m-b-20">Sed ornare ligula eget tortor tempor, quis porta tellus dictum.</p>
                    <a href="#" className="txt4">Learn More <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-ourmenu bg2-pattern p-t-115 p-b-120">
        <div className="container">
          <div className="title-section-ourmenu t-center m-b-22">
            <span className="tit2 t-center">Discover</span>
            <h3 className="tit5 t-center m-t-2">Our Menu</h3>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-sm-6">
                  <div className="item-ourmenu bo-rad-10 hov-img-zoom pos-relative m-t-30">
                    <img src="/images/our-menu-01.jpg" alt="IMG-MENU" />
                    <a href="#" className="btn2 flex-c-m txt5 ab-c-m size4">Lunch</a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="item-ourmenu bo-rad-10 hov-img-zoom pos-relative m-t-30">
                    <img src="/images/our-menu-05.jpg" alt="IMG-MENU" />
                    <a href="#" className="btn2 flex-c-m txt5 ab-c-m size5">Dinner</a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="item-ourmenu bo-rad-10 hov-img-zoom pos-relative m-t-30">
                    <img src="/images/our-menu-13.jpg" alt="IMG-MENU" />
                    <a href="#" className="btn2 flex-c-m txt5 ab-c-m size6">Happy Hour</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-12">
                  <div className="item-ourmenu bo-rad-10 hov-img-zoom pos-relative m-t-30">
                    <img src="/images/our-menu-08.jpg" alt="IMG-MENU" />
                    <a href="#" className="btn2 flex-c-m txt5 ab-c-m size7">Drink</a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="item-ourmenu bo-rad-10 hov-img-zoom pos-relative m-t-30">
                    <img src="/images/our-menu-10.jpg" alt="IMG-MENU" />
                    <a href="#" className="btn2 flex-c-m txt5 ab-c-m size8">Starters</a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="item-ourmenu bo-rad-10 hov-img-zoom pos-relative m-t-30">
                    <img src="/images/our-menu-16.jpg" alt="IMG-MENU" />
                    <a href="#" className="btn2 flex-c-m txt5 ab-c-m size9">Dessert</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-event">
        <div className="wrap-slick2">
          <div className="slick2">
            <div className="item-slick2 item1-slick2" style={{ backgroundImage: "url(/images/bg-event-01.jpg)" }}>
              <div className="wrap-content-slide2 p-t-115 p-b-208">
                <div className="container">
                  <div className="title-event t-center m-b-52">
                    <span className="tit2 p-l-15 p-r-15">Upcomming</span>
                    <h3 className="tit6 t-center p-l-15 p-r-15 p-t-3">Events</h3>
                  </div>
                  <div className="blo2 flex-w flex-str flex-col-c-m-lg animated visible-false" data-appear="zoomIn">
                    <a href="#" className="wrap-pic-blo2 bg1-blo2" style={{ backgroundImage: "url(/images/event-02.jpg)" }}>
                      <div className="time-event size10 txt6 effect1">
                        <span className="txt-effect1 flex-c-m t-center">08:00 PM Tuesday - 21 November 2018</span>
                      </div>
                    </a>
                    <div className="wrap-text-blo2 flex-col-c-m p-l-40 p-r-40 p-t-45 p-b-30">
                      <h4 className="tit7 t-center m-b-10">Wines during specific nights</h4>
                      <p className="t-center">Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed fringilla, nunc sed imperdiet lacinia</p>
                      <div className="flex-sa-m flex-w w-full m-t-40">
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 days">25</span><span className="dis-block t-center txt8">Days</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 hours">12</span><span className="dis-block t-center txt8">Hours</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 minutes">59</span><span className="dis-block t-center txt8">Minutes</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 seconds">56</span><span className="dis-block t-center txt8">Seconds</span></div>
                      </div>
                      <a href="#" className="txt4 m-t-40">View Details <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-slick2 item2-slick2" style={{ backgroundImage: "url(/images/bg-event-02.jpg)" }}>
              <div className="wrap-content-slide2 p-t-115 p-b-208">
                <div className="container">
                  <div className="title-event t-center m-b-52">
                    <span className="tit2 p-l-15 p-r-15">Upcomming</span>
                    <h3 className="tit6 t-center p-l-15 p-r-15 p-t-3">Events</h3>
                  </div>
                  <div className="blo2 flex-w flex-str flex-col-c-m-lg animated visible-false" data-appear="fadeInDown">
                    <a href="#" className="wrap-pic-blo2 bg2-blo2" style={{ backgroundImage: "url(/images/event-06.jpg)" }}>
                      <div className="time-event size10 txt6 effect1"><span className="txt-effect1 flex-c-m">08:00 PM Tuesday - 21 November 2018</span></div>
                    </a>
                    <div className="wrap-text-blo2 flex-col-c-m p-l-40 p-r-40 p-t-45 p-b-30">
                      <h4 className="tit7 t-center m-b-10">Wines during specific nights</h4>
                      <p className="t-center">Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed fringilla, nunc sed imperdiet lacinia</p>
                      <div className="flex-sa-m flex-w w-full m-t-40">
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 days">25</span><span className="dis-block t-center txt8">Days</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 hours">12</span><span className="dis-block t-center txt8">Hours</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 minutes">59</span><span className="dis-block t-center txt8">Minutes</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 seconds">56</span><span className="dis-block t-center txt8">Seconds</span></div>
                      </div>
                      <a href="#" className="txt4 m-t-40">View Details <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-slick2 item3-slick2" style={{ backgroundImage: "url(/images/bg-event-04.jpg)" }}>
              <div className="wrap-content-slide2 p-t-115 p-b-208">
                <div className="container">
                  <div className="title-event t-center m-b-52">
                    <span className="tit2 p-l-15 p-r-15">Upcomming</span>
                    <h3 className="tit6 t-center p-l-15 p-r-15 p-t-3">Events</h3>
                  </div>
                  <div className="blo2 flex-w flex-str flex-col-c-m-lg animated visible-false" data-appear="rotateInUpLeft">
                    <a href="#" className="wrap-pic-blo2 bg3-blo2" style={{ backgroundImage: "url(/images/event-01.jpg)" }}>
                      <div className="time-event size10 txt6 effect1"><span className="txt-effect1 flex-c-m">08:00 PM Tuesday - 21 November 2018</span></div>
                    </a>
                    <div className="wrap-text-blo2 flex-col-c-m p-l-40 p-r-40 p-t-45 p-b-30">
                      <h4 className="tit7 t-center m-b-10">Wines during specific nights</h4>
                      <p className="t-center">Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed fringilla, nunc sed imperdiet lacinia</p>
                      <div className="flex-sa-m flex-w w-full m-t-40">
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 days">25</span><span className="dis-block t-center txt8">Days</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 hours">12</span><span className="dis-block t-center txt8">Hours</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 minutes">59</span><span className="dis-block t-center txt8">Minutes</span></div>
                        <div className="size11 flex-col-c-m"><span className="dis-block t-center txt7 m-b-2 seconds">56</span><span className="dis-block t-center txt8">Seconds</span></div>
                      </div>
                      <a href="#" className="txt4 m-t-40">View Details <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap-slick2-dots"></div>
        </div>
      </section>

      <section className="section-booking bg1-pattern p-t-100 p-b-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-b-30">
              <div className="t-center">
                <span className="tit2 t-center">Reservation</span>
                <h3 className="tit3 t-center m-b-35 m-t-2">Book table</h3>
              </div>
              <p className="txt10 size22 m-b-30">
                Reserva tu mesa eligiendo fecha, hora, número de personas y mesa disponible. Completa tu reserva en un solo paso desde nuestra página de reservas.
              </p>
              <div className="wrap-btn-booking flex-c-m m-t-6">
                <Link href="/reservation" className="btn3 flex-c-m size13 txt11 trans-0-4">
                  Hacer reserva
                </Link>
              </div>
            </div>
            <div className="col-lg-6 p-b-30 p-t-18">
              <div className="wrap-pic-booking size2 bo-rad-10 hov-img-zoom m-l-r-auto">
                <img src="/images/booking-01.jpg" alt="IMG-OUR" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-review p-t-115">
        <div className="title-review t-center m-b-2">
          {/* <span className="tit2 p-l-15 p-r-15">Customers Say</span> */}
          <h3 className="tit8 t-center p-l-20 p-r-15 p-t-3">Review</h3>
        </div>
        <div className="wrap-slick3">
          <div className="slick3">
            <div className="item-slick3 item1-slick3">
              <div className="wrap-content-slide3 p-b-50 p-t-50">
                <div className="container">
                  <div className="pic-review size14 bo4 wrap-cir-pic m-l-r-auto animated visible-false" data-appear="zoomIn">
                    <img src="/images/avatar-01.jpg" alt="IGM-AVATAR" />
                  </div>
                  <div className="content-review m-t-33 animated visible-false" data-appear="fadeInUp">
                    <p className="t-center txt12 size15 m-l-r-auto"> We are lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tellus sem, mattis in pre-tium nec, fermentum viverra dui </p>
                    <div className="star-review fs-18 color0 flex-c-m m-t-12">
                      <i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i>
                    </div>
                    <div className="more-review txt4 t-center animated visible-false m-t-32" data-appear="fadeInUp">Marie Simmons ˗ New York</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-slick3 item2-slick3">
              <div className="wrap-content-slide3 p-b-50 p-t-50">
                <div className="container">
                  <div className="pic-review size14 bo4 wrap-cir-pic m-l-r-auto animated visible-false" data-appear="zoomIn">
                    <img src="/images/avatar-04.jpg" alt="IGM-AVATAR" />
                  </div>
                  <div className="content-review m-t-33 animated visible-false" data-appear="fadeInUp">
                    <p className="t-center txt12 size15 m-l-r-auto"> We are lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tellus sem, mattis in pre-tium nec, fermentum viverra dui </p>
                    <div className="star-review fs-18 color0 flex-c-m m-t-12">
                      <i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i>
                    </div>
                    <div className="more-review txt4 t-center animated visible-false m-t-32" data-appear="fadeInUp">Marie Simmons ˗ New York</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-slick3 item3-slick3">
              <div className="wrap-content-slide3 p-b-50 p-t-50">
                <div className="container">
                  <div className="pic-review size14 bo4 wrap-cir-pic m-l-r-auto animated visible-false" data-appear="zoomIn">
                    <img src="/images/avatar-05.jpg" alt="IGM-AVATAR" />
                  </div>
                  <div className="content-review m-t-33 animated visible-false" data-appear="fadeInUp">
                    <p className="t-center txt12 size15 m-l-r-auto"> We are lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tellus sem, mattis in pre-tium nec, fermentum viverra dui </p>
                    <div className="star-review fs-18 color0 flex-c-m m-t-12">
                      <i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i><i className="fa fa-star p-l-1" aria-hidden="true"></i>
                    </div>
                    <div className="more-review txt4 t-center animated visible-false m-t-32" data-appear="fadeInUp">Marie Simmons ˗ New York</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap-slick3-dots m-t-30"></div>
        </div>
      </section>

      <section className="section-video parallax100" style={{ backgroundImage: "url(/images/bg-cover-video-02.jpg)" }}>
        <div className="content-video t-center p-t-225 p-b-250">
          <span className="tit2 p-l-15 p-r-15">Discover</span>
          <h3 className="tit4 t-center p-l-15 p-r-15 p-t-3">Our Video</h3>
          <div className="btn-play ab-center size16 hov-pointer m-l-r-auto m-t-43 m-b-33" data-toggle="modal" data-target="#modal-video-01">
            <div className="flex-c-m sizefull bo-cir bgwhite color1 hov1 trans-0-4">
              <i className="fa fa-play fs-18 m-l-2" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="section-blog bg-white p-t-115 p-b-123">
        <div className="container">
          <div className="title-section-ourmenu t-center m-b-22">
            <span className="tit2 t-center">Latest News</span>
            <h3 className="tit5 t-center m-t-2">The Blog</h3>
          </div>
          <div className="row">
            <div className="col-md-4 p-t-30">
              <div className="blo1">
                <div className="wrap-pic-blo1 bo-rad-10 hov-img-zoom pos-relative">
                  <Link href="/blog-detail"><img src="/images/blog-01.jpg" alt="IMG-INTRO" /></Link>
                  <div className="time-blog">21 Dec 2017</div>
                </div>
                <div className="wrap-text-blo1 p-t-35">
                  <Link href="/blog-detail"><h4 className="txt5 color0-hov trans-0-4 m-b-13">Best Places for Wine</h4></Link>
                  <p className="m-b-20">Phasellus lorem enim, luctus ut velit eget, con-vallis egestas eros.</p>
                  <Link href="/blog-detail" className="txt4">Continue Reading <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-t-30">
              <div className="blo1">
                <div className="wrap-pic-blo1 bo-rad-10 hov-img-zoom pos-relative">
                  <Link href="/blog-detail"><img src="/images/blog-02.jpg" alt="IMG-INTRO" /></Link>
                  <div className="time-blog">15 Dec 2017</div>
                </div>
                <div className="wrap-text-blo1 p-t-35">
                  <Link href="/blog-detail"><h4 className="txt5 color0-hov trans-0-4 m-b-13">Eggs and Cheese</h4></Link>
                  <p className="m-b-20">Duis elementum, risus sit amet lobortis nunc justo condimentum ligula, vitae feugiat</p>
                  <Link href="/blog-detail" className="txt4">Continue Reading <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-t-30">
              <div className="blo1">
                <div className="wrap-pic-blo1 bo-rad-10 hov-img-zoom pos-relative">
                  <Link href="/blog-detail"><img src="/images/blog-03.jpg" alt="IMG-INTRO" /></Link>
                  <div className="time-blog">12 Dec 2017</div>
                </div>
                <div className="wrap-text-blo1 p-t-35">
                  <Link href="/blog-detail"><h4 className="txt5 color0-hov trans-0-4 m-b-13">Style the Wedding Party</h4></Link>
                  <p className="m-b-20">Sed ornare ligula eget tortor tempor, quis porta tellus dictum.</p>
                  <Link href="/blog-detail" className="txt4">Continue Reading <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
