import "./../styles/landing.css";
import introDoctor from "./../images/doctor-section1.png";

const Intro = () => {
  return (
    <div className='intro'>
      <div className='intro-section container'>
        <div className='intro-text'>
          <p className='text-white'>Healthcare Service</p>
          <h1 className='text-white intro-heading'>
            Better care for your health
          </h1>
          <p className='text-white appname'>DoctorEase</p>
          <p className='text-white'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <button className='button'>Learn More</button>
        </div>
        <div className='intro-graphic'>
          <img className='images' src={introDoctor} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
