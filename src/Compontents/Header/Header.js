import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./style.css"


export default function Header() {
 
    return (
      <nav className="nav">
        <Link to="/" className="site-title">
          LOGO - GS KIBYAGIRA
        </Link>
        <ul>
          <CustomLink to="/">Logout</CustomLink>
          <CustomLink to="/books">LMIF</CustomLink>
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
