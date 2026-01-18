import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{backgroundColor:"white"}}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", justifyContent:"center"}}>
        <li>
          <Link to="/" style={{color:"black"}}>Home</Link>
        </li>
        <li>
          <Link to="/about" style={{color:"black"}}>About</Link>
        </li>
        <li>
          <Link to="/services" style={{color:"black"}}>Services</Link>
        </li>
        <li>
          <Link to="/contact" style={{color:"black"}}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
