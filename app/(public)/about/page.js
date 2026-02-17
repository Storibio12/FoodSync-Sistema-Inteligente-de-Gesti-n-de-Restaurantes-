export const metadata = {
  title: "About Us - Pato Place",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15" style={{ backgroundImage: "url(/images/bg-title-page-03.jpg)" }}>
        <h2 className="tit6 t-center">About Us</h2>
      </section>

      <section className="bg2-pattern p-t-116 p-b-110 t-center p-l-15 p-r-15">
        <span className="tit2 t-center">Italian Restaurant</span>
        <h3 className="tit3 t-center m-b-35 m-t-5">Our Story</h3>
        <p className="t-center size32 m-l-r-auto">
          Fusce at risus eget mi auctor pulvinar. Suspendisse maximus venenatis pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam purus purus, lacinia a scelerisque in, luctus vel felis. Donec odio diam, dignissim a efficitur at, efficitur et est. Pellentesque semper est ut pulvinar ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla et leo accumsan, egestas velit ac, fringilla tortor. Sed varius justo sed luctus mattis.
        </p>
      </section>

      <section className="section-video parallax100" style={{ backgroundImage: "url(/images/header-menu-01.jpg)" }}>
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

      <section className="bg1-pattern p-t-120 p-b-105">
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-t-45 p-b-30">
              <div className="wrap-text-delicious t-center">
                <span className="tit2 t-center">Delicious</span>
                <h3 className="tit3 t-center m-b-35 m-t-5">RECIPES</h3>
                <p className="t-center m-b-22 size3 m-l-r-auto">
                  Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed fringilla, nunc sed imperdiet lacinia, nisl ante egestas mi, ac facilisis ligula sem id neque.
                </p>
              </div>
            </div>
            <div className="col-md-6 p-b-30">
              <div className="wrap-pic-delicious size2 bo-rad-10 hov-img-zoom m-l-r-auto">
                <img src="/images/our-story-01.jpg" alt="IMG-OUR" />
              </div>
            </div>
          </div>
          <div className="row p-t-170">
            <div className="col-md-6 p-b-30">
              <div className="wrap-pic-romantic size2 bo-rad-10 hov-img-zoom m-l-r-auto">
                <img src="/images/our-story-02.jpg" alt="IMG-OUR" />
              </div>
            </div>
            <div className="col-md-6 p-t-45 p-b-30">
              <div className="wrap-text-romantic t-center">
                <span className="tit2 t-center">Romantic</span>
                <h3 className="tit3 t-center m-b-35 m-t-5">Restaurant</h3>
                <p className="t-center m-b-22 size3 m-l-r-auto">
                  Fusce iaculis, quam quis volutpat cursus, tellus quam varius eros, in euismod lorem nisl in ante. Maecenas imperdiet vulputate dui sit amet vestibulum. Nulla quis suscipit nisl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="parallax0 parallax100" style={{ backgroundImage: "url(/images/bg-cover-video-02.jpg)" }}>
        <div className="overlay0-parallax t-center size33"></div>
      </div>

      <section className="section-chef bgwhite p-t-115 p-b-95">
        <div className="container t-center">
          <span className="tit2 t-center">Meet Our</span>
          <h3 className="tit5 t-center m-b-50 m-t-5">Chef</h3>
          <div className="row">
            {[
              { img: "avatar-02.jpg", name: "Peter Hart", role: "Chef", text: "Donec porta eleifend mauris ut effici-tur. Quisque non velit vestibulum, lob-ortis mi eget, rhoncus nunc" },
              { img: "avatar-03.jpg", name: "Joyce Bowman", role: "Chef", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis a sem tempus tempus." },
              { img: "avatar-05.jpg", name: "Peter Hart", role: "Chef", text: "Phasellus aliquam libero a nisi varius, vitae placerat sem aliquet. Ut at velit nec ipsum iaculis posuere quis in sapien" },
            ].map((chef, i) => (
              <div key={i} className="col-md-8 col-lg-4 m-l-r-auto p-b-30">
                <div className="blo5 pos-relative p-t-60">
                  <div className="pic-blo5 size14 bo4 wrap-cir-pic hov-img-zoom ab-c-t">
                    <a href="#"><img src={`/images/${chef.img}`} alt="IGM-AVATAR" /></a>
                  </div>
                  <div className="text-blo5 size34 t-center bo-rad-10 bo7 p-t-90 p-l-35 p-r-35 p-b-30">
                    <a href="#" className="txt34 dis-block p-b-6">{chef.name}</a>
                    <span className="dis-block t-center txt35 p-b-25">{chef.role}</span>
                    <p className="t-center">{chef.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-signup bg1-pattern p-t-85 p-b-85">
        <form className="flex-c-m flex-w flex-col-c-m-lg p-l-5 p-r-5">
          <span className="txt5 m-10">Specials Sign up</span>
          <div className="wrap-input-signup size17 bo2 bo-rad-10 bgwhite pos-relative txt10 m-10">
            <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="email-address" placeholder="Email Adrress" />
            <i className="fa fa-envelope ab-r-m m-r-18" aria-hidden="true"></i>
          </div>
          <button type="submit" className="btn3 flex-c-m size18 txt11 trans-0-4 m-10">Sign-up</button>
        </form>
      </div>
    </>
  );
}
