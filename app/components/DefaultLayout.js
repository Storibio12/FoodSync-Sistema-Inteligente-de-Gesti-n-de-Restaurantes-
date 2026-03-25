import Script from "next/script";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ScriptsInit from "./ScriptsInit";
import ChatbotFAQ from "./ChatbotFAQ";

export default function DefaultLayout({ children }) {
  return (
    <>
      <ScriptsInit />
      <Header />
      <Sidebar />
      {children}

      <Footer />

      <ChatbotFAQ />

      <div className="btn-back-to-top bg0-hov" id="myBtn">
        <span className="symbol-btn-back-to-top">
          <i className="fa fa-angle-double-up" aria-hidden="true"></i>
        </span>
      </div>

      <div id="dropDownSelect1"></div>

      <div className="modal fade" id="modal-video-01" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document" data-dismiss="modal">
          <div className="close-mo-video-01 trans-0-4" data-dismiss="modal" aria-label="Close">&times;</div>
          <div className="wrap-video-mo-01">
            <div className="w-full wrap-pic-w op-0-0"><img src="/images/icons/video-16-9.jpg" alt="IMG" /></div>
            <div className="video-mo-01">
              <iframe src="https://www.youtube.com/embed/5k1hSu2gdKE?rel=0&amp;showinfo=0" allowFullScreen title="Video"></iframe>
            </div>
          </div>
        </div>
      </div>

      <Script src="/vendor/jquery/jquery-3.2.1.min.js" strategy="beforeInteractive" />
      <Script src="/vendor/animsition/js/animsition.min.js" strategy="afterInteractive" />
      <Script src="/vendor/bootstrap/js/popper.js" strategy="afterInteractive" />
      <Script src="/vendor/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/vendor/select2/select2.min.js" strategy="afterInteractive" />
      <Script src="/vendor/daterangepicker/moment.min.js" strategy="afterInteractive" />
      <Script src="/vendor/daterangepicker/daterangepicker.js" strategy="afterInteractive" />
      <Script src="/vendor/slick/slick.min.js" strategy="afterInteractive" />
      <Script src="/vendor/parallax100/parallax100.js" strategy="afterInteractive" />
      <Script src="/vendor/countdowntime/countdowntime.js" strategy="afterInteractive" />
      <Script src="/vendor/lightbox2/js/lightbox.min.js" strategy="afterInteractive" />
      <Script src="/vendor/isotope/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/js/slick-custom.js" strategy="afterInteractive" />
      <Script id="parallax-init" strategy="afterInteractive">
        {"if (typeof window.$ !== 'undefined' && window.$.fn.parallax100) { window.$('.parallax100').parallax100(); }"}
      </Script>
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
