import "./../styles/newsletter.css";

const Newsletter = () => {
  return (
    <div className='newsletter-section'>
      <div className='newsletter-div'>
        <h3 className='newsletter-title'>Subscribe to our Newsletter</h3>
        <p className='newsletter-subtitle'>
          Stay up to date with our latest news, updates and special offers.
        </p>
        <div className='newsletter-email-div'>
          <input
            className='newsletter-email'
            type='email'
            placeholder='Enter your email address'
          />
          <button className='newsletter-button'>Send Now</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
