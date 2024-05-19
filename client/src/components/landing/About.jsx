import "./../styles/landing.css";
import doctorOffice from "./../images/doctor-office.avif";

const About = () => {
  return (
    <div className='about-section container'>
      <div className='about-graphic'>
        <img className='images office-photo' src={doctorOffice} />
      </div>
      <div className='about-text'>
        <h3 className='text-blue'>About Us</h3>
        <h4 className='subheading'>Care and Compassion are Provided in Bulk</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
          incidunt ullam praesentium, voluptas ab doloremque atque officia fugit
          eveniet! Sequi doloribus repellat fugit maxime autem perferendis ipsa
          consequatur beatae aliquid.
        </p>
        <button className='button'>More About Us</button>
      </div>
    </div>
  );
};

export default About;
