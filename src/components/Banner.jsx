import Slider from "react-slick";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 10 seconds
    arrows: true,         // enable arrows
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        <div>
          <img src={banner1} alt="Banner 1" className="banner-image" />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" className="banner-image" />
        </div>
        <div>
          <img src={banner3} alt="Banner 3" className="banner-image" />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;