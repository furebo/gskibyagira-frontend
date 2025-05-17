import React, { useEffect } from 'react';
import './schoolvalues.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactTyped as Typed } from 'react-typed'; // Corrected import statement

function Values() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []); // Added empty dependency array to ensure effect only runs once

  return (
    <>
      <div className='container1' data-aos="zoom-in">
        <div className="intro-container">
          <h2 className="intro-h2">
            <Typed strings={["Our School Values"]}       
              typeSpeed={80}
              backSpeed={50}
              loop/>
          </h2>
          <p className="intro-p">
           <p> <span>KUBAKIRA BYOSE KURI YESU KRISTU</span> <span className='spanvalue'>CHRIST CENTERED</span></p>
           <p> <span>GUSHINGIRA BYOSE KURI BIBILIYA</span>  <span className='spanvalue'>BIBLE BASED</span></p>
           <p> <span>GUKORANA UMURAVA</span> <span className='spanvalue'>HARDSHIP</span ></p>
           <p> <span>UBUNYANGAMUGAYO</span> <span className='spanvalue'>INTEGRITY</span></p>
           <p> <span>UBUDASHYIKIRYA</span>  <span className='spanvalue'>EXCELLENCE</span></p>
           <p> <span>UBUSONGA BWIZA</span>  <span className='spanvalue'>STEWARDSHIP</span></p>
          </p>
        </div>
      </div>
    </>
  );
}

export default Values;