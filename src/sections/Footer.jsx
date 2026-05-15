import React from "react"
import "../styles/sections/Footer.css"

const Footer = () => {
  return (
    <footer id="main-footer" className="footer">
      <div className="footer-container">

        {/* Brand & Contact */}
        <div className="footer-brand">
          <h2 className="footer-logo">anandofoods</h2>
          <a
            href="https://maps.app.goo.gl/1YvjPsXDrtBtUSy87"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address"
          >
            Bapa Sitaram Madhuli, Shivkrupa Nagar,<br />
            Bhuj, Mirjapar Part, Gujarat 370040
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@revatix.in&su=Inquiry%20from%20anandofoods&body=Hello%20anandofoods%20Team,"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-email"
          >
            anandofoods.com
          </a>
        </div>

        {/* Links */}
        <div className="footer-nav">
          <div className="footer-column">
            <p className="footer-col-title">Explore</p>
            {["Menu", "Gallery", "Chef", "Contact"].map((link) => (
              <a key={link} href="#" className="footer-link">
                {link}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <p className="footer-col-title">Follow</p>
            {["Instagram", "Facebook", "Twitter"].map((social) => (
              <a key={social} href="#" className="footer-link">
                {social}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">© Revatix 2026. All rights reserved.</p>
        <p className="footer-agency">Crafted Beyond Code — Revatix.</p>
      </div>
    </footer>
  )
}

export default Footer
