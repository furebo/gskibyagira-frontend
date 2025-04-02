import Navbar from '../Navbar';
import IntroSection from '../intro/Intro'
import ContactSection from '../contact-section/ContactSection'
import DisclaimerSection from '../disclaimer/Disclaimer';
import Values from '../schoolValues/schoolvalues';
import FooterSection from '../footer/Footer'
import SliderSt from '../staff/SliderStaff';
import Slider from '../slider/Slider';
import Infrastr from '../Infrastructures/infrastructures';
import GirlsRoom from '../Infrastructures/girlsRoom';
import GsKibyagira from '../Infrastructures/Gskibyagira';
import './Homepage.css';
function Homepage (){ 
    const backgcl = {
        background: 'linear-gradient(to right, #00828c, #fff )'
    }
    return (
        <>
        <Navbar />
        <hr></hr>
        <div>
              <div id='kibyagira'>
              <Slider />
              </div>
              <div style={backgcl}>
              <div id='aboutus'>
              <GsKibyagira/>
              </div>
              <GirlsRoom /> 
              <Infrastr/>
              <div id='mission'>
              <IntroSection className="intro-section" />
              </div>
              <SliderSt />
              <div id="values">
              <Values className="intro-section" />
              </div>
              <section className='contactsect' id="contact-section">
              <ContactSection className="contact-section"/>
              </section>
              <DisclaimerSection/>
              <FooterSection />
             </div>
             
      </div>       
      </>
    )
}
export default Homepage
