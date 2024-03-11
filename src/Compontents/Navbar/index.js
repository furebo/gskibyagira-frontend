import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState,useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css"


export default function Navbar() {
  const modelRef = useRef(null)
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  function closeModel(){
    const isHidden = () => modelRef.current.classList.contains("box--hidden");
    if (!isHidden()) {
        modelRef.current.classList.add("box--hidden");
        setTimeout(() =>{
            modelRef.current.style.visibility = 'hidden' 
            //history.push('/')
        }, 2000);
    } else {
        modelRef.current.classList.remove("box--hidden")
    }
  }

  if(modal) {
    //modelRef.current.classList.add('active-modal')
  
    return(
      <>
      <div className='model-container' ref = {modelRef}>
            <div className='model'>
            <div className='close'><CloseIcon className='closeIcon' onClick= {closeModel} /></div>
                <form>
                    <div className='form-group'>
                        <label htmlFor='page'>Username</label>
                        <input name='page'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='page'>Email</label>
                        <input name='page'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='page'>Password</label>
                        <input name='page' type='password'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Role</label>
                        <select>
                            <option value="live">Teacher</option>
                            <option value="draft">Student</option>
                            <option value="error">Staff Member</option>
                            <option value="error">Guest</option>
                        </select>
                    </div>
                    <button type='submit' className='btn'>Submit</button>
                </form>
            </div>
        </div>

<nav className="navv">
<div className="welcome">Welcome to GS KIBYAGIRA</div>
<Link to="/" className="site-title">
  LOGO - GS KIBYAGIRA
</Link>
<ul>
  <CustomLink onClick={toggleModal}>Login</CustomLink>
  <CustomLink to="/login">LMIS</CustomLink>
  <CustomLink to="/admin">Admin</CustomLink>
  <CustomLink to="/books">Books</CustomLink>
</ul>
</nav>
</>
    )
  
  } 

  
    //document.body.classList.remove('active-modal')
    return (
      <nav className="nav">
        <Link to="/" className="site-title">
          LOGO - GS KIBYAGIRA
        </Link>
        <ul>
          <CustomLink to="/login">LMIF</CustomLink>
          <CustomLink to="/admin">Admin</CustomLink>
          <CustomLink to="/books">Books</CustomLink>
        </ul>
      </nav>
    )
  

}


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <>
    
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
    </>
  )
}

