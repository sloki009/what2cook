import React, { useState, useEffect } from "react";
import "./navbar.css";

function Navbar() {
  const [nav, handleNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleNav(true);
      } else {
        handleNav(false);
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${nav && "nav_black"}`}>
      <p className="logo_text">
        <em>what2cook.</em>
        <small>com</small>
      </p>

      <img
        className="nav_profileimg"
        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
      />
    </div>
  );
}

export default Navbar;
