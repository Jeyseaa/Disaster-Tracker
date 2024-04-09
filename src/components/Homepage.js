import React, { useState, useEffect } from "react";
import '../styles/homepage.css'; 
import "../styles/custom.slider.css"; 
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <header className="col-xs-12">
          <div className="col-xs-3 col-sm-2">
            <h1>
            <img
  src="https://i.ibb.co/dtXtqss/Flag-of-Camiling-Tarlac-1-2.png"
  alt="logo"
  className="img-responsive"
  style={{ width: '300px', height: '300px' }} 
/>

              <h3 className="col-xs-9 col-sm-10 heading">
                Camiling Municipal Hall
                <span className="hidden-xs hidden-sm subheading" id="subheading">
                  - Ang Sangguniang Bayan ng Camiling!
                </span>
              </h3>
            </h1>
          </div>
        </header>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <section id="something">
            <div className="row">
              <section className="col-xs-12 col-xs-offset-0" id="middle-section">
              <div className="col-xs-4 col-sm-4 text-center">
        <Link to="/login" className="icon"> {/* Use Link instead of 'a' */}
          <i className="pic fa fa-5x fa-user"></i>
          <span className="icon-text">Barangay Official</span>
        </Link>
                </div>
                <div className="col-xs-4 col-sm-4 text-center">
                  <a href="#" className="icon">
                    <i className="pic fa fa-5x fa-user"></i>
                    <span className="icon-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </a>
                </div>
                <div className="col-xs-4 col-sm-4 text-center">
                <Link to="/admin-login" className="icon">
        <i className="pic fa fa-5x fa-user"></i>
        <span className="icon-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </Link>
                </div>
              </section>
            </div>
          </section>

          <CustomCarousel>
            {/* Add children for the carousel */}
            <img src="https://moncadatarlac.gov.ph/wp-content/uploads/2024/01/422917710_982735346532836_4579899017081015332_n.jpg" alt="Slide 1" />
            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t31.18172-8/15800084_1356534537752634_6787498943745352373_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHjYWBA8Adko3Rx79fA7cw-6zxvUDkvrZjrPG9QOS-tmI-k53Bk_iX_H4Rcrd7ujWxjSZ4TUUsySJ25Nn59EuQA&_nc_ohc=dYbJSt_vlywAX_hzvU5&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfAw_7QnD-xBWJOvTgXIH2Engu3M0_1IYCLEXnVgoKd3Wg&oe=6631D3BB" alt="Slide 2" />
            <img src="https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/365466649_612065911061369_3601836126591747095_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OrBWxSd1c_EAb6A18Qz&_nc_ht=scontent.fmnl30-3.fna&oh=00_AfCtAZ2H-LPMgOxJqb497mZubtkzzCC9NcZpbKaea90uAg&oe=661A9A48" alt="Slide 3" />
          </CustomCarousel>

          <div className="well" id="grad">
            <div className="row">
              <section className="col-xs-10 col-xs-offset-1" id="picture-section">
                {/* Your picture section content */}
              </section>
            </div>
          </div>
        </div>

        
          <div className="col-xs-12 col-sm-6">
            <div className="row">
              <div className="col-xs-11 col-sm-7 col-md-8" id="section2">
                <div className="well extra-space">
                  <article>
                    <h2>Welcome to Camiling Municipal Hall- Ang Sangguniang Bayan ng Camiling!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius feugiat lorem in semper. Sed vulputate, orci a elementum scelerisque, diam tortor dignissim quam, sed consequat nibh leo quis metus. Morbi finibus imperdiet mi, eget aliquam quam tincidunt ut. Nam.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend auctor orci, ac condimentum risus mattis sed. Morbi dictum convallis ullamcorper. Morbi molestie ex accumsan sagittis feugiat. Donec finibus lectus vel nulla commodo ultrices. Vivamus ut varius lacus. Nulla iaculis tristique dignissim. Integer sit amet diam fringilla, ullamcorper felis quis, mollis ex. Orci varius natoque penatibus et magnis dis parturient.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel tellus ac.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius quis leo quis finibus. Ut et pharetra eros, auctor lobortis.</p>
                  </article>
                </div> 
                <hr className="style1"/><br/>
                <section className="col-xs-12" id="timeline">
                  <h2>MGA BARANGAY</h2>
                  <ul>
                    <li>Anoling 1st</li>
                    <li>Anoling 2nd</li>
                    <li>Anoling 3rd</li>
                    <li>Bacabac</li>
                    <li>1869: NYC advertises a 30 second response time and provides an ambulance surgeon and a quart of brandy for their patients</li>
                    <li>1878: Treatment established on how to restore breathing and circulation</li>
                    <li>1950: Modern EMS began in the 1950's.  There were 5 different types of ambulance services: Towing operators, medical equipment companies, funeral homes, hospital and police/fire departments.</li>
                    <li>1979: The Journal of Emergency Medical Services (JEMS) starts publication</li>
                    <li>1985: The National Association of EMS Physicians is established</li>
                    <li>1990: The Trauma Care System Planning and Development Act is passed by congress</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <div className="directions">
                <a
                  href="https://www.google.com/maps/dir//Bamban,+Tarlac/@15.2885122,120.5292133,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3396eb72f067df35:0x671531e0ba5a7cf5!2m2!1d120.5704134!2d15.2884332!3e0?entry=ttu"
                  target="_blank"
                >
                  Driving Directions
                </a>
              </div>
              <div className="google-maps">
                {/* Google Maps Embed */}
                <iframe
                  title="Google Maps Embed"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25382.264879005605!2d120.478692!3d15.2493114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396eb72f067df35%3A0x671531e0ba5a7cf5!2sBamban%2C%20Tarlac!5e0!3m2!1sen!2sph!4v1649297999788!5m2!1sen!2sph"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <div className="row">
          <nav className="navbar navbar-default navbar-bottom" id="bottom-nav">
            <address className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-2 col-md-offset-5 text-center">
            <i class="fa fa-map-marker" aria-hidden="true"></i> Camiling Municipal Hall, Quezon Avenue, 2306, Camiling, Tarlac<br />
            <i class="fa fa-globe" aria-hidden="true"></i> http://www.camiling-lgu.gov.ph<br />
            <i class="fa fa-phone" aria-hidden="true"></i> (04593) 40328
            </address>
            <h4 className="text-center col-xs-12">Camiling Municipal Hall</h4>
          </nav>
        </div>
      </div>
    
  );
}

function CustomCarousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [children.length]);

  const slideNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  };

  return (
    <div className="container__slider">
      {children.map((item, index) => (
        <div
          key={index}
          className={`slider__item ${index === activeIndex ? 'slider__item-active' : ''}`}
        >
          {item}
        </div>
      ))}

      <div className="container__slider__links">
        {children.map((_, index) => (
          <button
            key={index}
            className={`container__slider__links-small ${
              index === activeIndex ? 'container__slider__links-small-active' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <button className="slider__btn-next" onClick={slideNext}>{'>'}</button>
      <button className="slider__btn-prev" onClick={slidePrev}>{'<'}</button>
    </div>
  );
}


export default Homepage;