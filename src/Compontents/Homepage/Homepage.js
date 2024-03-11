import Navbar from '../Navbar';
import IntroSection from '../intro/Intro'
import ContactSection from '../contact-section/ContactSection'
import DisclaimerSection from '../disclaimer/Disclaimer'
import FooterSection from '../footer/Footer'
//import StaffImages from '../StaffImages/images';
import SliderSt from '../staff/SliderStaff';
import Slider from '../slider/Slider';
import './Homepage.css';
import Map from '../Map/Map';
function Homepage (){ 
    return (
        <>
        <div className="App">
        <div className="nav">
        
        <Navbar className="navComponent"/>
        </div>
        <hr></hr>
        
        <div>
              <Slider />
              <IntroSection className="intro-section"/>
              <SliderSt />
              <ContactSection className="contact-section"/>
              <DisclaimerSection/>
              <FooterSection />
      </div>
        
      </div>
      <div className='footer1'>
        <Map className='footer1' />
      </div>
      </>
    )
}
export default Homepage
