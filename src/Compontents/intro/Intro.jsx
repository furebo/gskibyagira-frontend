import React, { useEffect } from 'react';
import './intro.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactTyped as Typed } from 'react-typed'; // Corrected import statement

function Intro() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []); // Added empty dependency array to ensure effect only runs once

  return (
    <>
      <div className='container1' data-aos="zoom-in">
        <div className="intro-container">
          <h2 className="intro-h2">
            <Typed strings={["Our Mission"]}       
              typeSpeed={80}
              backSpeed={50}
              loop/>
          </h2>
          <p className="intro-p">
            To be a school that provides caring learning environment for all students where Hygiene Discipline,ICT,Intellectual and spiritual values hold the key, to the success.
          </p>
        </div>
        <div className="intro-container">
          <h2 className="intro-h2">Our Vision</h2>
          <p className="intro-p">
            To be an excellent school in basic knowledge and in all levels of education
          </p>
        </div>
      </div>
    </>
  );
}

export default Intro;
