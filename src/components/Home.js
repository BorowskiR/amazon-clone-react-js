import React from 'react';
import './Home.css';
import Product from '../components/Product';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import img2 from '../assets/header-img2.jpg';
import img3 from '../assets/header-img3.jpg';
import img4 from '../assets/header-img4.jpg';

function Home() {
  return (
    <>
      <div className="carousel-wrapper">
        <OwlCarousel items={1} className="owl-theme" loop autoplay dots="none">
          <div className="item">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
              alt=""
              className="home__image"
            />
          </div>
          <div className="item">
            <img src={img2} alt="" className="" />
          </div>
          <div className="item">
            <img src={img3} alt="" className="home__image" />
          </div>
          <div className="item">
            <img src={img4} alt="" className="home__image" />
          </div>
        </OwlCarousel>
      </div>
      <div className="home">
        <div className="home__container">
          {/* <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt=""
          /> */}
          <div className="home__row">
            <Product
              key="2456743"
              id="215"
              title="The lean startup"
              price={29.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
              rating={5}
            />
            <Product
              key="216"
              id="4125"
              title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
              price={239.99}
              image="https://images-na.ssl-images-amazon.com/images/I/91gRKbX%2BS8L._AC_SX450_.jpg"
              rating={4}
            />
          </div>
          <div className="home__row">
            <Product
              key="217"
              id="46665"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
              price={199.99}
              image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
              rating={3}
            />
            <Product
              key="25"
              id="23652"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
              price={98.99}
              image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
              rating={5}
            />
            <Product
              key="237"
              id="23552"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
              rating={4}
            />
          </div>
          <div className="home__row">
            <Product
              key="21417"
              id="2321552"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
              price={598.99}
              image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
              rating={4}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
