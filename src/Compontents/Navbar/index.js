import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Model from "../ModelLogin";
import SignupModel from "../ModelSignup";
import "./styles/index.css";
import { useState } from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from "react-toastify";
export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [signupModelOpen, setSignupModelOpen] = useState(false);

  const handleLoginModel = () => {
    setModelOpen(true);
    setIsMobile(false); // Close menu on click
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  const handleSignupModel = () => {
    setSignupModelOpen(true);
    setIsMobile(false); // Close menu on click
  };

  return (
    <>
      <nav className="nav">
        <Link to="/" className="sitetitle" onClick={() => scrollToSection("kibyagira")}>GS KIBYAGIRA</Link>
        {/* Close menu when a menu item is clicked */}
        <ul className={`links ${isMobile ? "mobile" : ""}`} onClick={() => setIsMobile(false)}>
        <li className="alink" onClick={() => scrollToSection("values")}>Values</li>
          <li className="alink" onClick={() => scrollToSection("mission")}>Mission & Vision</li>
          <li className="alink" onClick={() => scrollToSection("aboutus")}>About Us</li>
          <li className="alink" onClick={() => scrollToSection("contact-section")}>Contact Us</li>
          <li className="alink" onClick={handleLoginModel}>BMIS</li>
          <li className="alink" onClick={handleSignupModel}>Signup</li>
        </ul>
        <button onClick={() => setIsMobile(!isMobile)} className="mobile">
          {isMobile ? <CloseIcon /> : <DehazeIcon className="dehazeicon" />}
        </button>
      </nav>
      <ToastContainer position="top-center" />
      {modelOpen && <Model closeModel={() => setModelOpen(false)} />}
      {signupModelOpen && <SignupModel closeModel={() => setSignupModelOpen(false)} />}
    </>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "isactive" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
