import "./../styles/landing.css";
import doctorOffice from "./../images/doctor-office.avif";
import aboutUs from "./../images/about_us.jpg";

const About = () => {
  return (
    <div className='about-section container'>
      <div className='about-graphic'>
        <img className='images office-photo' src={aboutUs} />
      </div>
      <div className='about-text'>
        <h3 className='text-blue'>About Us</h3>
        <h4 className='subheading'>Care and Compassion are Provided in Bulk</h4>
        <p>
          Welcome to our healthcare website, where cutting-edge technology meets
          compassionate care to deliver comprehensive medical services. Our
          platform offers innovative features to enhance your healthcare
          experience. Our Chatbot diagnoses your symptoms for possible problems
          and is available 24/7. For Bone Analysis, our X-ray Diagnosis feature
          allows secure upload and analysis of medical images using sopisticated
          algorithms, AI learning and historic dataset. Additionally, our
          platform maintains a comprehensive Diagnosis History for easy
          reference and continuity of care. We are dedicated to empowering you
          with the tools for informed healthcare decisions, whether you need
          symptom guidance, ongoing support, or detailed diagnostic evaluations.
        </p>
        {/* <button className='button'>More About Us</button> */}
      </div>
    </div>
  );
};

export default About;
