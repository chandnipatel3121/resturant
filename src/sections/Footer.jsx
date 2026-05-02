import React from "react"
import "../styles/sections/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand & Contact */}
        <div className="footer-brand">
          <h2 className="footer-logo">RESTRO</h2>
          <a
            href="https://www.google.com/maps?q=Shreeji+Arcade+Aeroplane+Circle+Bhuj+Gujarat"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address"
          >
            102, 1st Floor, Shreeji Arcade, Aeroplane Circle, Opp. Reliance Petrol Pump, Aiya Nagar, <br />
            Bhuj, Gujarat 370001
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@revatix.in&su=Inquiry%20from%20Restro&body=Hello%20Restro%20Team,"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-email"
          >
            support@revatix.in
          </a>
        </div>

        {/* Links */}
        <div className="footer-nav">
          <div className="footer-column">
            <p className="footer-col-title">Explore</p>
            {["Menu", "Experience", "Chef", "Reservations"].map((link) => (
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
