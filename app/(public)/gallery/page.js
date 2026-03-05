export const metadata = {
  title: "Gallery - FoodSync",
};

const galleryItems = [
  { src: "photo-gallery-13.jpg", classes: "events guests" },
  { src: "photo-gallery-14.jpg", classes: "food" },
  { src: "photo-gallery-15.jpg", classes: "events" },
  { src: "photo-gallery-16.jpg", classes: "food" },
  { src: "photo-gallery-17.jpg", classes: "food" },
  { src: "photo-gallery-18.jpg", classes: "interior guests" },
  { src: "photo-gallery-19.jpg", classes: "interior" },
  { src: "photo-gallery-20.jpg", classes: "interior" },
  { src: "photo-gallery-21.jpg", classes: "events" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15" style={{ backgroundImage: "url(/images/bg-title-page-02.jpg)" }}>
        <h2 className="tit6 t-center">Gallery</h2>
      </section>

      <div className="section-gallery p-t-118 p-b-100">
        <div className="wrap-label-gallery filter-tope-group size27 flex-w flex-sb-m m-l-r-auto flex-col-c-sm p-l-15 p-r-15 m-b-60">
          <button className="label-gallery txt26 trans-0-4 is-actived" data-filter="*" type="button">All Photo</button>
          <button className="label-gallery txt26 trans-0-4" data-filter=".interior" type="button">Interior</button>
          <button className="label-gallery txt26 trans-0-4" data-filter=".food" type="button">Food</button>
          <button className="label-gallery txt26 trans-0-4" data-filter=".events" type="button">Events</button>
          <button className="label-gallery txt26 trans-0-4" data-filter=".guests" type="button">Vip guests</button>
        </div>

        <div className="wrap-gallery isotope-grid flex-w p-l-25 p-r-25">
          {galleryItems.map((item, i) => (
            <div key={i} className={`item-gallery isotope-item bo-rad-10 hov-img-zoom ${item.classes}`}>
              <img src={`/images/${item.src}`} alt="IMG-GALLERY" />
              <div className="overlay-item-gallery trans-0-4 flex-c-m">
                <a className="btn-show-gallery flex-c-m fa fa-search" href={`/images/${item.src}`} data-lightbox="gallery"></a>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination flex-c-m flex-w p-l-15 p-r-15 m-t-24 m-b-50">
          <a href="#" className="item-pagination flex-c-m trans-0-4 active-pagination">1</a>
          <a href="#" className="item-pagination flex-c-m trans-0-4">2</a>
          <a href="#" className="item-pagination flex-c-m trans-0-4">3</a>
        </div>
      </div>

      <div className="section-signup bg1-pattern p-t-85 p-b-85">
        <form className="flex-c-m flex-w flex-col-c-m-lg p-l-5 p-r-5">
          {/* <span className="txt5 m-10">Specials Sign up</span>
          <div className="wrap-input-signup size17 bo2 bo-rad-10 bgwhite pos-relative txt10 m-10">
            <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="email-address" placeholder="Email Adrress" />
            <i className="fa fa-envelope ab-r-m m-r-18" aria-hidden="true"></i>
          </div>
          <button type="submit" className="btn3 flex-c-m size18 txt11 trans-0-4 m-10">Sign-up</button> */}
        </form>
      </div>
    </>
  );
}
