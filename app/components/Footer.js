export default function Footer() {
  return (
    <footer className="bg1">
      <div className="container p-t-40 p-b-70">
        <div className="row">
          <div className="col-sm-6 col-md-4 p-t-50">
            <h4 className="txt13 m-b-33">Contact Us</h4>
            <ul className="m-b-70">
              <li className="txt14 m-b-14">
                <i className="fa fa-map-marker fs-16 dis-inline-block size19" aria-hidden="true"></i>
                8th floor, 379 Hudson St, New York, NY 10018
              </li>
              <li className="txt14 m-b-14">
                <i className="fa fa-phone fs-16 dis-inline-block size19" aria-hidden="true"></i>
                (+1) 96 716 6879
              </li>
              <li className="txt14 m-b-14">
                <i className="fa fa-envelope fs-13 dis-inline-block size19" aria-hidden="true"></i>
                contact@site.com
              </li>
            </ul>
            <h4 className="txt13 m-b-32">Opening Times</h4>
            <ul>
              <li className="txt14">09:30 AM – 11:00 PM</li>
              <li className="txt14">Every Day</li>
            </ul>
          </div>

          <div className="col-sm-6 col-md-4 p-t-50">
            <h4 className="txt13 m-b-33">Latest twitter</h4>
            <div className="m-b-25">
              <span className="fs-13 color2 m-r-5">
                {/* <i className="fa fa-twitter" aria-hidden="true"></i> */}
              </span>
              <a href="#" className="txt15">@colorlib</a>
              <p className="txt14 m-b-18">
                Activello is a good option. It has a slider built into that displays the featured image in the slider.
                <a href="#" className="txt15">https://buff.ly/2zaSfAQ</a>
              </p>
              <span className="txt16">21 Dec 2017</span>
            </div>
            <div>
              <span className="fs-13 color2 m-r-5">
                {/* <i className="fa fa-twitter" aria-hidden="true"></i> */}
              </span>
              <a href="#" className="txt15">@colorlib</a>
              <p className="txt14 m-b-18">
                Activello is a good option. It has a slider built into that displays
                <a href="#" className="txt15">https://buff.ly/2zaSfAQ</a>
              </p>
              <span className="txt16">21 Dec 2017</span>
            </div>
          </div>

          <div className="col-sm-6 col-md-4 p-t-50">
            <h4 className="txt13 m-b-38">Gallery</h4>
            <div className="wrap-gallery-footer flex-w">
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-01.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-01.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-02.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-02.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-03.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-03.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-04.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-04.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-05.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-05.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-06.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-06.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-07.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-07.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-08.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-08.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-09.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-09.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-10.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-10.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-11.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-11.jpg" alt="GALLERY" />
              </a>
              <a className="item-gallery-footer wrap-pic-w" href="/images/photo-gallery-12.jpg" data-lightbox="gallery-footer">
                <img src="/images/photo-gallery-thumb-12.jpg" alt="GALLERY" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="end-footer bg2">
        <div className="container">
          <div className="flex-sb-m flex-w p-t-22 p-b-22">
            <div className="p-t-5 p-b-5">
              {/* <a href="#" className="fs-15 c-white"><i className="fa fa-tripadvisor" aria-hidden="true"></i></a> */}
              {/* <a href="#" className="fs-15 c-white"><i className="fa fa-facebook m-l-18" aria-hidden="true"></i></a> */}
              {/* <a href="#" className="fs-15 c-white"><i className="fa fa-twitter m-l-18" aria-hidden="true"></i></a> */}
            </div>
            {/* <div className="txt17 p-r-20 p-t-5 p-b-5">
              Copyright &copy; 2018 All rights reserved  |  This template is made with <i className="fa fa-heart"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
