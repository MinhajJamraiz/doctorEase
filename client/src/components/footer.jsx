import "./styles/footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <button className='footer-button footer-heading-btn'>DoctorEase</button>
      <div>
        <a href='/' target='_self'>
          <button className='footer-button'>Home</button>
        </a>
        <a href='#' target='_self' className='footer-button'>
          <button className='footer-button'>About Us</button>
        </a>
        <a href='#' target='_self' className='footer-button'>
          <button className='footer-button'>Services</button>
        </a>
        <a href='#' target='_self' className='footer-button'>
          <button className='footer-button'>Contact</button>
        </a>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
