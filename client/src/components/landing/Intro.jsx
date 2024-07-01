import "./../styles/landing.css";
import introDoctor from "./../images/doctor-section1.png";

const Intro = () => {
  return (
    <div className='intro'>
      <div className='intro-section container'>
        <div className='intro-text'>
          <p className='text-white'>Healthcare Website</p>
          <h1 className='text-white intro-heading'>
            Better care for your health
          </h1>
          <p className='text-white appname'>DoctorEase</p>
          <p className='text-white'>
            No time for a doctor ? We've got you covered.
          </p>
        </div>
        <div className='intro-graphic'>
          <img className='images' src={introDoctor} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
