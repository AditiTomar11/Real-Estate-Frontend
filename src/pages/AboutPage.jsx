import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './AboutPage.css';

// Simple scroll-reveal hook — adds .is-visible when element enters viewport
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

// Animated count-up for stats
function Counter({ end, suffix = '', duration = 1400 }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}
      {suffix}
    </span>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        {/* floating gradient orbs — pure CSS animation */}
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />

        <div className="container about-hero__row">
          <div className="live-pill">
            <span className="live-dot" />
            Live: new listings added every day
          </div>
          <h1 className="about-hero__title">
            Property hunting in India
            <br />
            shouldn&apos;t feel like <span className="text-gold-anim">guesswork.</span>
          </h1>
          <p className="about-hero__sub">
            Bhoomi started as a simple idea: put real listings, real filters, and real comparisons
            in one place — instead of scattered broker calls and half-updated PDFs.
          </p>

          <div className="about-hero__stats">
            <div className="stat">
              <Counter end={4200} suffix="+" />
              <span className="stat-label">Verified listings</span>
            </div>
            <div className="stat">
              <Counter end={38} suffix="" />
              <span className="stat-label">Cities covered</span>
            </div>
            <div className="stat">
              <Counter end={99} suffix="%" />
              <span className="stat-label">No pay-to-rank</span>
            </div>
          </div>
        </div>
      </section>

      <Reveal className="container about-split">
        <div className="about-split__image">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000"
            alt="Modern apartment interior"
          />
          <div className="image-glow" />
        </div>
        <div className="about-split__copy">
          <h2>What we&apos;re building</h2>
          <p>
            Every listing on Bhoomi carries the details that actually matter before you make a
            decision — carpet area, exact locality, and honest pricing, not marketing language
            dressed up as facts. You can filter by what you need, save the ones worth a second
            look, and line two or three up side by side before you pick up the phone.
          </p>
          <p>
            We&apos;re not a brokerage. We don&apos;t push a &quot;featured&quot; listing because
            someone paid for placement. The goal is simply a faster, clearer way to see
            what&apos;s actually available.
          </p>
        </div>
      </Reveal>

      <section className="about-values">
        <div className="container about-values__grid">
          {[
            {
              title: 'Clarity over volume',
              text: 'A shorter list of well-described properties beats a thousand vague ones. Every listing here has real area, price, and location — no "price on request."',
            },
            {
              title: 'No pay-to-rank listings',
              text: 'What you see first is what matches your filters, not whoever paid the most for visibility this month.',
            },
            {
              title: 'Built for comparing',
              text: 'Save properties you\u2019re considering and compare them directly — area, price, and configuration side by side, not across five open browser tabs.',
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <div className="about-value">
                <div className="about-value__icon">0{i + 1}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="container about-cta">
        <h2>Have a property to list, or one to find?</h2>
        <div className="about-cta__actions">
          <Link to="/listings" className="btn btn-gold btn-pulse">
            Browse listings
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </Reveal>
    </div>
  );
}