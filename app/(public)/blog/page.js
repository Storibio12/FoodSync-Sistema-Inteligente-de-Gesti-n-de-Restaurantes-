import Link from "next/link";

export const metadata = {
  title: "Blog - Pato Place",
};

const posts = [
  { img: "blog-05.jpg", day: "28", month: "Dec, 2018", title: "Cooking recipe Delicious", date: "28 December, 2018" },
  { img: "blog-06.jpg", day: "20", month: "Dec, 2018", title: "Pizza is prepared fresh", date: "20 December, 2018" },
  { img: "blog-04.jpg", day: "16", month: "Dec, 2018", title: "Style the Wedding Party", date: "16 December, 2018" },
  { img: "blog-07.jpg", day: "15", month: "Dec, 2018", title: "Best Places for Wine", date: "15 December, 2018" },
  { img: "blog-10.jpg", day: "12", month: "Dec, 2018", title: "Best Places for Wine", date: "12 December, 2018" },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15" style={{ backgroundImage: "url(/images/bg-title-page-03.jpg)" }}>
        <h2 className="tit6 t-center">Blog</h2>
      </section>

      <section>
        <div className="bread-crumb bo5-b p-t-17 p-b-17">
          <div className="container">
            <Link href="/" className="txt27">Home</Link>
            <span className="txt29 m-l-10 m-r-10">/</span>
            <span className="txt29">Blog</span>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9">
              <div className="p-t-80 p-b-124 bo5-r h-full p-r-50 p-r-0-md bo-none-md">
                {posts.map((post, i) => (
                  <div key={i} className="blo4 p-b-63">
                    <div className="pic-blo4 hov-img-zoom bo-rad-10 pos-relative">
                      <Link href="/blog-detail">
                        <img src={`/images/${post.img}`} alt="IMG-BLOG" />
                      </Link>
                      <div className="date-blo4 flex-col-c-m">
                        <span className="txt30 m-b-4">{post.day}</span>
                        <span className="txt31">{post.month}</span>
                      </div>
                    </div>
                    <div className="text-blo4 p-t-33">
                      <h4 className="p-b-16">
                        <Link href="/blog-detail" className="tit9">{post.title}</Link>
                      </h4>
                      <div className="txt32 flex-w p-b-24">
                        <span>by Admin <span className="m-r-6 m-l-4">|</span></span>
                        <span>{post.date} <span className="m-r-6 m-l-4">|</span></span>
                        <span>Cooking, Food <span className="m-r-6 m-l-4">|</span></span>
                        <span>8 Comments</span>
                      </div>
                      <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius</p>
                      <Link href="/blog-detail" className="dis-block txt4 m-t-30">Continue Reading <i className="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i></Link>
                    </div>
                  </div>
                ))}
                <div className="pagination flex-l-m flex-w m-l--6 p-t-25">
                  <a href="#" className="item-pagination flex-c-m trans-0-4 active-pagination">1</a>
                  <a href="#" className="item-pagination flex-c-m trans-0-4">2</a>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <div className="sidebar2 p-t-80 p-b-80 p-l-20 p-l-0-md p-t-0-md">
                <div className="search-sidebar2 size12 bo2 pos-relative">
                  <input className="input-search-sidebar2 txt10 p-l-20 p-r-55" type="text" name="search" placeholder="Search" />
                  <button className="btn-search-sidebar2 flex-c-m ti-search trans-0-4" type="button"></button>
                </div>
                <div className="categories">
                  <h4 className="txt33 bo5-b p-b-35 p-t-58">Categories</h4>
                  <ul>
                    {["Cooking recipe", "Delicious foods", "Events Design", "Restaurant Place", "WordPress"].map((c) => (
                      <li key={c} className="bo5-b p-t-8 p-b-8"><a href="#" className="txt27">{c}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="popular">
                  <h4 className="txt33 p-b-35 p-t-58">Most popular</h4>
                  <ul>
                    <li className="flex-w m-b-25">
                      <div className="size16 bo-rad-10 wrap-pic-w of-hidden m-r-18"><a href="#"><img src="/images/blog-11.jpg" alt="IMG-BLOG" /></a></div>
                      <div className="size28">
                        <a href="#" className="dis-block txt28 m-b-8">Best Places for Wine</a>
                        <span className="txt14">3 days ago</span>
                      </div>
                    </li>
                    <li className="flex-w m-b-25">
                      <div className="size16 bo-rad-10 wrap-pic-w of-hidden m-r-18"><a href="#"><img src="/images/blog-12.jpg" alt="IMG-BLOG" /></a></div>
                      <div className="size28">
                        <a href="#" className="dis-block txt28 m-b-8">Eggs and Cheese</a>
                        <span className="txt14">3 days ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
