
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="container footer__cta">
        <div className="footer__cta-content">
          <span className="footer__eyebrow">LET'S CONNECT</span>

          <h2 className="footer__title">
            Have a project in mind?
            <br />
            <span>Let’s build something great.</span>
          </h2>

          <a
            href="mailto:tomaraditi037@gmail.com"
            className="footer__cta-btn"
          >
            Get in Touch <span>↗</span>
          </a>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container footer__contact">
        <div className="footer__brand">
          <p className="footer__logo">Bhoomi.</p>
          <p className="footer__tag">
            Residential &amp; commercial listings across India.
          </p>
        </div>

        <div className="footer__details">
          <div className="footer__item">
            <span className="footer__label">NAME</span>
            <span className="footer__value">Aditi Tomar</span>
          </div>

          <div className="footer__item">
            <span className="footer__label">EMAIL</span>
            <a
              href="mailto:tomaraditi037@gmail.com"
              className="footer__value footer__link"
            >
              tomaraditi037@gmail.com
            </a>
          </div>

          <div className="footer__item">
            <span className="footer__label">PHONE</span>
            <a
              href="tel:+91*********"
              className="footer__value footer__link"
            >
              +91 *********
            </a>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
