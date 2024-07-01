import "./../styles/newsletter.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Newsletter = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='newsletter-section'>
      {user ? (
        <Link to='./chatbox' className='newsletter-div'>
          <p className='newsletter-title'>Click Here to Get Started!</p>
        </Link>
      ) : (
        <Link to='./login' className='newsletter-div'>
          <p className='newsletter-title'>Login to Get Started!</p>
        </Link>
      )}
    </div>
  );
};

export default Newsletter;
