import Navbar from '../Navbar';
import IntroSection from '../intro/Intro'
import ContactSection from '../contact-section/ContactSection'
import DisclaimerSection from '../disclaimer/Disclaimer'
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
              <Slider />
              <div style={backgcl}>
              <GsKibyagira/>
              <GirlsRoom /> 
              <Infrastr/>
              <IntroSection className="intro-section"/>
              <SliderSt />
              <div className='contactsect'>
              <ContactSection className="contact-section"/>
              </div>
              <DisclaimerSection/>
              <FooterSection />
             </div>
             
      </div>       
      </>
    )
}
export default Homepage
