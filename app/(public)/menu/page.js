import Link from "next/link";

export const metadata = {
  title: "Menu - FoodSync",
};

export default function MenuPage() {
  return (
    <>
      <section className="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15" style={{ backgroundImage: "url(/images/bg-title-page-01.jpg)" }}>
        <h2 className="tit6 t-center">FoodSync Menu</h2>
      </section>

      <section className="section-mainmenu p-t-110 p-b-70 bg1-pattern">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-6 p-r-35 p-r-15-lg m-l-r-auto">
              <div className="wrap-item-mainmenu p-b-22">
                <h3 className="tit-mainmenu tit10 p-b-25">STARTERS</h3>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Pine nut sbrisalona</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$29.79</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Sed fermentum eros vitae eros</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Aenean eu</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$19.35</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Feugiat maximus neque pharetra</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Sed feugiat</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$12.19</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Proin lacinia nisl ut ultricies posuere nulla</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Consectetur</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$21.89</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Etiam cursus facilisis tortor</span>
                </div>
              </div>
              <div className="wrap-item-mainmenu p-b-22">
                <h3 className="tit-mainmenu tit10 p-b-25">Drinks</h3>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Vivamus pretium</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$29.79</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Sed fermentum eros vitae eros</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Duis pharetra ligula</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$19.35</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Feugiat maximus neque pharetra</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">In eu dolor</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$53.34</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Proin lacinia nisl ut ultricies posuere nulla</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Feugiat maximus</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$62.45</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Sed fermentum eros vitae eros</span>
                </div>
              </div>
            </div>
            <div className="col-md-10 col-lg-6 p-l-35 p-l-15-lg m-l-r-auto">
              <div className="wrap-item-mainmenu p-b-22">
                <h3 className="tit-mainmenu tit10 p-b-25">Main</h3>
                {["Duis sed aliquet $31.18", "Suspendisse $70.25", "Scelerisque sed $36.19", "Mollis nulla $19.50", "Convallis augue $29.15", "Maecenas tristique $29.79", "Duis tincidunt $19.35"].map((item, i) => {
                  const [name, price] = item.split(" $");
                  return (
                    <div key={i} className="item-mainmenu m-b-36">
                      <div className="flex-w flex-b m-b-3">
                        <a href="#" className="name-item-mainmenu txt21">{name}</a>
                        <div className="line-item-mainmenu bg3-pattern"></div>
                        <div className="price-item-mainmenu txt22">${price}</div>
                      </div>
                      <span className="info-item-mainmenu txt23">Proin lacinia nisl ut ultricies posuere nulla</span>
                    </div>
                  );
                })}
              </div>
              <div className="wrap-item-mainmenu p-b-22">
                <h3 className="tit-mainmenu tit10 p-b-25">Dessert</h3>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">tempus aliquet</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$9.79</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Proin lacinia nisl ut ultricies posuere nulla</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">scelerisque</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$19.35</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Sed fermentum eros vitae eros</span>
                </div>
                <div className="item-mainmenu m-b-36">
                  <div className="flex-w flex-b m-b-3">
                    <a href="#" className="name-item-mainmenu txt21">Cras maximus</a>
                    <div className="line-item-mainmenu bg3-pattern"></div>
                    <div className="price-item-mainmenu txt22">$5.79</div>
                  </div>
                  <span className="info-item-mainmenu txt23">Duis pharetra ligula at urna dignissim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-lunch bgwhite">
        <div className="header-lunch parallax0 parallax100" style={{ backgroundImage: "url(/images/header-menu-01.jpg)" }}>
          <div className="bg1-overlay t-center p-t-170 p-b-165">
            <h2 className="tit4 t-center">Lunch</h2>
          </div>
        </div>
        <div className="container">
          <div className="row p-t-108 p-b-70">
            <div className="col-md-8 col-lg-6 m-l-r-auto">
              {[
                { img: "lunch-01.jpg", name: "Sed varius", desc: "Aenean pharetra tortor dui in pellentesque", price: "$29.79" },
                { img: "lunch-03.jpg", name: "tempus aliquet", desc: "Aenean condimentum ante erat", price: "$45.09" },
                { img: "lunch-05.jpg", name: "Duis massa", desc: "Proin lacinia nisl ut ultricies posuere nulla", price: "$12.75" },
              ].map((item, i) => (
                <div key={i} className="blo3 flex-w flex-col-l-sm m-b-30">
                  <div className="pic-blo3 size20 bo-rad-10 hov-img-zoom m-r-28">
                    <a href="#"><img src={`/images/${item.img}`} alt="IMG-MENU" /></a>
                  </div>
                  <div className="text-blo3 size21 flex-col-l-m">
                    <a href="#" className="txt21 m-b-3">{item.name}</a>
                    <span className="txt23">{item.desc}</span>
                    <span className="txt22 m-t-20">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-8 col-lg-6 m-l-r-auto">
              {[
                { img: "lunch-02.jpg", name: "sbrisalona", desc: "Proin lacinia nisl ut ultricies posuere nulla", price: "$29.79" },
                { img: "lunch-04.jpg", name: "Cras eget magna", desc: "Sed fermentum eros vitae eros", price: "$45.09" },
                { img: "lunch-06.jpg", name: "Nullam maximus", desc: "Duis pharetra ligula at urna dignissim", price: "$12.75" },
              ].map((item, i) => (
                <div key={i} className="blo3 flex-w flex-col-l-sm m-b-30">
                  <div className="pic-blo3 size20 bo-rad-10 hov-img-zoom m-r-28">
                    <a href="#"><img src={`/images/${item.img}`} alt="IMG-MENU" /></a>
                  </div>
                  <div className="text-blo3 size21 flex-col-l-m">
                    <a href="#" className="txt21 m-b-3">{item.name}</a>
                    <span className="txt23">{item.desc}</span>
                    <span className="txt22 m-t-20">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-signup bg1-pattern p-t-85 p-b-85">
        {/* <form className="flex-c-m flex-w flex-col-c-m-lg p-l-5 p-r-5">
          <span className="txt5 m-10">Specials Sign up</span>
          <div className="wrap-input-signup size17 bo2 bo-rad-10 bgwhite pos-relative txt10 m-10">
            <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="email-address" placeholder="Email Adrress" />
            <i className="fa fa-envelope ab-r-m m-r-18" aria-hidden="true"></i>
          </div>
          <button type="submit" className="btn3 flex-c-m size18 txt11 trans-0-4 m-10">Sign-up</button>
        </form> */}
      </div>
    </>
  );
}
