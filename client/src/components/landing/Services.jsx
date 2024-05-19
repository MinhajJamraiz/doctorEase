import "./../styles/landing.css";
import serviceOne from "./../images/service-1.png";
import serviceTwo from "./../images/service-2.png";
import serviceThree from "./../images/service-3.png";
import serviceFour from "./../images/service-4.png";

const Services = () => {
  return (
    <div className='services-section'>
      <div className='services-header'>
        <h3 className='text-blue'>OUR SERVICE</h3>
        <h2>Common Specialties</h2>
      </div>

      <div className='services-area'>
        <div className='service-div'>
          <img className='service-img' src={serviceOne} />
          <h3>Medical Check</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia ex, impedit facere assumenda voluptate nihil. Corporis
            consequatur iusto excepturi?
          </p>
          <a className='text-blue' target='_blank' href='#'>
            Read More &#8594;
          </a>
        </div>

        <div className='service-div'>
          <img className='service-img' src={serviceTwo} />
          <h3>X-Ray Scanning</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia ex, impedit facere assumenda voluptate nihil. Corporis
            consequatur iusto excepturi?
          </p>
          <a className='text-blue' target='_blank' href='#'>
            Read More &#8594;
          </a>
        </div>

        <div className='service-div'>
          <img className='service-img' src={serviceThree} />
          <h3>Medical History</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia ex, impedit facere assumenda voluptate nihil. Corporis
            consequatur iusto excepturi?
          </p>
          <a className='text-blue' target='_blank' href='#'>
            Read More &#8594;
          </a>
        </div>

        <div className='service-div'>
          <img className='service-img' src={serviceFour} />
          <h3>Report Analysis</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia ex, impedit facere assumenda voluptate nihil. Corporis
            consequatur iusto excepturi?
          </p>
          <a className='text-blue' target='_blank' href='#'>
            Read More &#8594;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
