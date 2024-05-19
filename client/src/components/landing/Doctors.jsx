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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
          blanditiis repellat explicabo culpa omnis eaque harum similique sit
          inventore quis!
        </p>
        <button className='button'>Read More</button>
      </div>
    </div>
  );
};

export default Doctors;
