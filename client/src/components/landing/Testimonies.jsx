import "./../styles/landing.css";
import reviewModel from "./../images/model.jpg";
import fiveStar from "./../images/5star.png";

const Testimonies = () => {
  return (
    <div className='testimonies-section'>
      <h2 className='text-white'>Our Customers & Clients</h2>
      <img className='testimony-model' src={reviewModel} />
      <p className='text-white testimony-name'>Lorem Ipsum</p>
      <img className='rating' src={fiveStar} />
      <p className='text-white testimony-text'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. In velit qui
        deleniti, ut maxime eum necessitatibus. Maiores hic ipsa asperiores?
        Vitae nostrum et quo dolorum.
      </p>
      <div className='slide-buttons'>
        <div className='slide-button'></div>
        <div className='slide-button'></div>
        <div className='slide-button'></div>
      </div>
    </div>
  );
};

export default Testimonies;
