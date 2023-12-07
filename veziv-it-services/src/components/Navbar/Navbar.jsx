import "./Navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);

  return (
    <header className="app__header">
      <nav className="app__navbar app__container">
        <Link className="nav__logo" to="/">
          Logo
        </Link>
        <div className={`nav__menu ${navToggle ? "show-menu" : ""}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Home</Link>
            </li>
            {["About", "Experience", "Contact"].map((item) => (
              <li className="nav__item" key={item}>
                <a className="nav__link" href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}
              <li><Link to="/write" className="nav__link">Post</Link></li>
            {/* <li>
              logout
      write experience
            </li> */}
          </ul>

          <div className="nav__close">
            <IoClose onClick={() => setNavToggle(false)} />
          </div>
        </div>

        <div className="nav__actions">
          
            <FaUserCircle className="nav__login" />
          

          <div className="nav__toggle">
            <IoMenu onClick={() => setNavToggle(true)} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
