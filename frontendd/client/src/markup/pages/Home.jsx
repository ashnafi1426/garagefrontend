import React from "react";
const Home = () => {
  return (
    <div className="page-wrapper">
      {/* Video Section */}
      <section
        className="video-section"
        style={{
          backgroundImage: "url('/assets/images/custom/banner/banner1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="auto-container">
          <h5>Working since 1999</h5>
          <h2>
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div className="video-box">
            <div className="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                className="overlay-link lightbox-image video-fancybox ripple"
                target="_blank"
                rel="noreferrer"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>
            <div className="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-box">
                <img src="/assets/images/custom/misc/vban1.jpg" alt="uu" />
                <img src="/assets/images/custom/misc/vban2.jpg" alt="jj" />
                <div className="year-experience">
                  <strong>24</strong> years <br /> Experience
                </div>
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                <h5>Welcome to Our Workshop</h5>
                <h2>We have 24 years experience</h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure proactive domination.
                    At the end of the day, going forward, a new normal that has evolved from generation X
                    is on the runway heading towards a streamlined cloud solution.
                  </p>
                  <p>
                    Override the digital divide with additional clickthroughs from DevOps.
                    Nanotechnology immersion along the information highway will close the loop on focusing.
                  </p>
                </div>
                <div className="link-btn mt-40">
                  <a href="/about" className="theme-btn btn-style-one style-two">
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Our Featured Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive domination.
              At the end of the day, going forward, a new normal that has evolved from generation X
              is on the runway heading towards a streamlined cloud solution.
            </div>
          </div>

          <div className="row">
            {[
              { title: "Performance Upgrade", icon: "flaticon-power" },
              { title: "Transmission Services", icon: "flaticon-gearbox" },
              { title: "Brake Repair & Service", icon: "flaticon-brake-disc" },
              { title: "Engine Service & Repair", icon: "flaticon-car-engine" },
              { title: "Tyre & Wheels", icon: "flaticon-tire" },
              { title: "Denting & Painting", icon: "flaticon-spray-gun" },
            ].map((service, i) => (
              <div className="col-lg-4 service-block-one" key={i}>
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>{service.title}</h2>
                  <a href="uu" className="read-more">
                    read more +
                  </a>
                  <div className="icon">
                    <span className={service.icon}></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="inner-container">
                <h2>
                  Quality Service And <br /> Customer Satisfaction !!
                </h2>
                <div className="text">
                  We utilize the most recent diagnostic equipment to ensure your vehicle is fixed or serviced properly.
                  Our workshop is committed to providing the best auto service with a team of certified mechanics.
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/resource/image-3.jpg" alt="service" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Why Choose Us</h2>
                <div className="text">
                  Bring to the table win-win survival strategies to ensure proactive domination.
                  At the end of the day, going forward, a new normal that has evolved from generation heading towards.
                </div>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>
                <h4>Certified Expert Mechanics</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>
                <h4>Fast And Quality Service</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>
                <h4>Best Prices in Town</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>
                <h4>Awarded Workshop</h4>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Additional Services</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="image">
                    <img src="/assets/images/resource/image-4.jpg" alt="Additional Services" />
                  </div>
                </div>
                <div className="col-md-7">
                  <ul className="list">
                    <li>General Auto Repair & Maintenance</li>
                    <li>Transmission Repair & Replacement</li>
                    <li>Tire Repair and Replacement</li>
                    <li>State Emissions Inspection</li>
                    <li>Brake Job / Brake Services</li>
                    <li>Electrical Diagnostics</li>
                    <li>Fuel System Repairs</li>
                    <li>Starting and Charging Repair</li>
                    <li>Steering and Suspension Work</li>
                    <li>Emission Repair Facility</li>
                    <li>Wheel Alignment</li>
                    <li>Computer Diagnostic Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="auto-container">
          <div className="wrapper-box">
            <div className="left-column">
              <h3>Schedule Your Appointment Today</h3>
              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className="right-column">
              <div className="phone">1800.456.7890</div>
              <div className="btn">
                <a href="pp" className="theme-btn btn-style-one">
                  <span>Appointment</span> <i className="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
