import "./../styles/landing.css";
import serviceOne from "./../images/service-1.png";
import serviceTwo from "./../images/service-2.png";
import serviceThree from "./../images/service-3.png";
import serviceFour from "./../images/service-4.png";
import doctorOffice from "./../images/doctor-office.avif";

const Services = () => {
  return (
    <div>
      <div className='services-section'>
        <div className='services-header'>
          <h3 className='text-blue'>OUR SERVICES</h3>
          <h2>Common Specialties</h2>
        </div>
        <div className='services-area'>
          <div className='service-div'>
            <img className='service-img' src={serviceOne} />
            <h3>Medical Diagnosis</h3>
            <p>
              Provides you with information about what might be the problem and
              solution to your trouble.
            </p>
            <a className='text-blue' target='_self' href='#medical_diagnosis'>
              Read More &#8594;
            </a>
          </div>
          <div className='service-div'>
            <img className='service-img' src={serviceTwo} />
            <h3>X-Ray Analysis</h3>
            <p>
              Don't know about X-rays ? Use our X-ray analysis to confirm if
              your bones are in good shape.
            </p>
            <a className='text-blue' target='_self' href='#xray_analysis'>
              Read More &#8594;
            </a>
          </div>
          <div className='service-div'>
            <img className='service-img' src={serviceThree} />
            <h3>Diagnosis History</h3>
            <p>
              Can't remember what the EaseBot diagnosed? Access the Diagnosis
              history to find out.
            </p>
            <a className='text-blue' target='_self' href='#diagnosis_history'>
              Read More &#8594;
            </a>
          </div>
          <div className='service-div'>
            <img className='service-img' src={serviceFour} />
            <h3>Symptom Analysis</h3>
            <p>
              Know the symptoms but don't know the disease? Use the symptom
              analysis to find out.
            </p>
            <a className='text-blue' target='_self' href='#symptom_analysis'>
              Read More &#8594;
            </a>
          </div>
        </div>
      </div>
      <div id='medical_diagnosis' className='about-section container'>
        <div className='about-graphic'>
          <img className='images office-photo' src={doctorOffice} />
        </div>
        <div className='about-text'>
          <h3 className='text-blue'>Medical Diagnosis</h3>
          <h4 className='subheading'>Your Virtual Health Advisor</h4>
          <p>
            Welcome to our Health Diagnosis Chatbot! This cutting-edge tool is
            designed to assist you in understanding your symptoms and potential
            health conditions. By engaging in a simple conversation, our chatbot
            can interpret your inputs and provide a preliminary diagnosis based
            on the medical knowledge. Whether you're feeling unwell and seeking
            guidance or just curious about a particular symptom, our chatbot is
            here to help. Our Health Diagnosis Chatbot is easy to use and
            accessible to everyone. Just start chatting, and the system will ask
            you relevant questions to gather information about your symptoms.
            Within moments, you'll receive a detailed response with potential
            diagnoses and recommendations for further action. This can be
            incredibly valuable for early detection and deciding when to seek
            professional medical advice. We prioritize accuracy and reliability
            in our diagnostic process, ensuring that our chatbot is continually
            updated with the latest medical data.
          </p>
          {/* <button className='button'>More About Us</button> */}
        </div>
      </div>
      <div id='xray_analysis' className='about-section container'>
        <div className='about-graphic'>
          <img
            className='images office-photo office-photo--reverse'
            src={doctorOffice}
          />
        </div>
        <div className='about-text about-text--reverse'>
          <h3 className='text-blue'>X Ray Analysis</h3>
          <h4 className='subheading'>Your Reliable Health Partner</h4>
          <p>
            Welcome to our X-ray Analysis feature! This innovative tool
            harnesses the power of advanced technology to assist in evaluating
            musculoskeletal X-rays. By using a vast collection of images, our
            system has learned to identify potential issues in bones and joints
            with remarkable accuracy. Whether you are a medical professional
            looking for a second opinion or someone seeking more information
            about your X-ray results, our tool is designed to provide clear and
            reliable insights quickly. Our X-ray Analysis tool is easy to use
            and accessible to everyone. Simply upload your X-ray image, and
            within moments, you'll receive an analysis highlighting if the xray
            is faulty or normal. This can be incredibly useful for early
            detection and treatment planning, helping to ensure you get the care
            you need promptly.
          </p>
          {/* <button className='button'>More About Us</button> */}
        </div>
      </div>
      <div id='symptom_analysis' className='about-section container'>
        <div className='about-graphic'>
          <img className='images office-photo' src={doctorOffice} />
        </div>
        <div className='about-text'>
          <h3 className='text-blue'>Symptom Analysis</h3>
          <h4 className='subheading'>
            Quick and Accurate Health Insights from Images
          </h4>
          <p>
            Welcome to our Symptom Analysis feature! This innovative tool
            leverages Optical Character Recognition (OCR) technology to read
            symptoms from an image and provide a possible disease associated
            with it. Simply upload a photo of your printed symptom list, and our
            system will quickly analyze the information and identify potential
            health conditions that match your symptoms. Our Symptom Analysis
            feature is designed to be user-friendly and accessible to everyone.
            Within moments of uploading your image, you'll receive a detailed
            analysis that highlights potential diseases causing your symptoms.
            This can be incredibly useful for early detection and deciding when
            to seek further medical advice.
          </p>
          {/* <button className='button'>More About Us</button> */}
        </div>
      </div>
      <div id='diagnosis_history' className='about-section container'>
        <div className='about-graphic'>
          <img
            className='images office-photo office-photo--reverse'
            src={doctorOffice}
          />
        </div>
        <div className='about-text about-text--reverse'>
          <h3 className='text-blue'>Diagnosis History</h3>
          <h4 className='subheading'>Your Comprehensive Health Record</h4>
          <p>
            Welcome to our Diagnosis History feature! This essential tool keeps
            a detailed record of your interactions with our chatbot, including
            the final diagnosis, recommended actions, and condition summaries.
            By maintaining a comprehensive history, you can easily track your
            health progress, review past consultations, and ensure continuity of
            care. Our Diagnosis History feature is designed to be user-friendly
            and easily accessible. With just a few clicks, you can revisit
            previous diagnoses, understand the suggested steps to take, and
            monitor any changes in your condition. This can be incredibly
            valuable for managing chronic conditions, following up on previous
            health concerns, or sharing information with healthcare providers.
            We prioritize accuracy and reliability, ensuring that your health
            history is securely stored and always available when you need it.
          </p>
          {/* <button className='button'>More About Us</button> */}
        </div>
      </div>
    </div>
  );
};

export default Services;
