import "./../styles/landing.css";
import doctorsDoctor from "./../images/doctor-section4.png";

const Doctors = () => {
  return (
    <div className='doctors-section'>
      <div className='doctors-graphic'>
        <div className='doctor-img-bg'>
          <img className='images doctor-img' src={doctorsDoctor} />
        </div>
      </div>
      <div className='doctors-text'>
        <h4 className='text-blue'>Our Doctor</h4>
        <h3 className='subheading'>
          Caring For The Health And Wellbeing Of You And Your Family
        </h3>
        <p>
          Our Doctor, EASEBOT , is a bot that uses keywords contained in a
          sentence to identify what might be the problem. Than it asks well
          defined questions based on which it gives its results to the user. It
          is to be noted that the EASEBOT is a computer program that has limited
          knowledge, can make mistakes and is not operated by a person or a
          doctor. Our bot is only for suggestions and for comfortable access.
          You are always suggested to double check with your doctor in case of
          any confusion.
        </p>
      </div>
    </div>
  );
};

export default Doctors;
