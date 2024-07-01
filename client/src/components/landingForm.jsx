import React from "react";
import Intro from "./landing/Intro.jsx";
import Newsletter from "./landing/Newsletter.jsx";
import Services from "./landing/Services.jsx";
import Testimonies from "./landing/Testimonies.jsx";
import About from "./landing/About.jsx";
import Doctors from "./landing/Doctors.jsx";
import Footer from "./footer.jsx";
const Landing = () => {
  return (
    <div>
      <Intro />
      <div className='container'>
        <About />
        <Services />

        <Doctors />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Landing;
