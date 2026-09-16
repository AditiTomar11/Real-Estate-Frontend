import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyGrid from '../components/property/PropertyGrid';
import { useProperties } from '../context/PropertiesContext';
import { useAuth } from '../context/AuthContext';
import SectionAdminControls from '../components/admin/SectionAdminControls';
import TrendingProjectFormModal from '../components/admin/TrendingProjectFormModal';
import FeaturedCityFormModal from '../components/admin/FeaturedCityFormModal';
import WhyChooseUsFormModal from '../components/admin/WhyChooseUsFormModal';
import HowItWorksFormModal from '../components/admin/HowItWorksFormModal';
import TestimonialFormModal from '../components/admin/TestimonialFormModal';
import { getTrendingProjects, deleteTrendingProject } from '../api/trendingProjectApi';
import { getFeaturedCities, deleteFeaturedCity } from '../api/featuredCityApi';
import { getWhyChooseUsItems, deleteWhyChooseUsItem } from '../api/whyChooseUsApi';
import { getHowItWorksSteps, deleteHowItWorksStep } from '../api/howItWorksApi';
import { getTestimonials, deleteTestimonial } from '../api/testimonialApi';
import { getSiteSettings } from '../api/siteSettingsApi';
import { submitEnquiry } from '../api/enquiryApi';
import './HomePage.css';

export default function HomePage() {
  const { properties } = useProperties();
  const { isAdmin, user } = useAuth();
  const featured = properties.filter((p) => p.status === 'AVAILABLE').slice(0, 6);

  const [heroImages, setHeroImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [featuredCities, setFeaturedCities] = useState([]);
  const [whyChooseUsItems, setWhyChooseUsItems] = useState([]);
  const [howItWorksSteps, setHowItWorksSteps] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [trendingModal, setTrendingModal] = useState(null);
  const [cityModal, setCityModal] = useState(null);
  const [whyModal, setWhyModal] = useState(null);
  const [howModal, setHowModal] = useState(null);
  const [testimonialModal, setTestimonialModal] = useState(null);

  useEffect(() => {
    setHeroImages([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
    ]);

    Promise.all([
      getTrendingProjects(),
      getFeaturedCities(),
      getWhyChooseUsItems(),
      getHowItWorksSteps(),
      getTestimonials(),
      getSiteSettings(),
    ])
      .then(([tp, fc, wcu, hiw, t, s]) => {
        setTrendingProjects(tp);
        setFeaturedCities(fc);
        setWhyChooseUsItems(wcu);
        setHowItWorksSteps(hiw);
        setTestimonials(t);
        setSettings(s);
      })
      .catch((err) => console.error('Failed to load homepage content:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages]);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    propertyType: 'Residential',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');
  const [enquirySending, setEnquirySending] = useState(false);

  // Prefill name/email from the logged-in user, and keep synced if they log in
  // while this page is already open.
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnquirySending(true);
    setEnquiryError('');
    try {
      await submitEnquiry({
        propertyId: null,
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: `[${form.propertyType}] ${form.message}`,
      });
      setSubmitted(true);
    } catch (err) {
      setEnquiryError(err.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setEnquirySending(false);
    }
  }

  function handleTrendingSaved(item, isEdit) {
    setTrendingProjects((prev) =>
      isEdit ? prev.map((p) => (p.id === item.id ? item : p)) : [...prev, item]
    );
  }
  async function handleTrendingDelete(id) {
    await deleteTrendingProject(id);
    setTrendingProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function handleCitySaved(item, isEdit) {
    setFeaturedCities((prev) =>
      isEdit ? prev.map((c) => (c.id === item.id ? item : c)) : [...prev, item]
    );
  }
  async function handleCityDelete(id) {
    await deleteFeaturedCity(id);
    setFeaturedCities((prev) => prev.filter((c) => c.id !== id));
  }

  function handleWhySaved(item, isEdit) {
    setWhyChooseUsItems((prev) =>
      isEdit ? prev.map((i) => (i.id === item.id ? item : i)) : [...prev, item]
    );
  }
  async function handleWhyDelete(id) {
    await deleteWhyChooseUsItem(id);
    setWhyChooseUsItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleHowSaved(item, isEdit) {
    setHowItWorksSteps((prev) =>
      isEdit ? prev.map((s) => (s.id === item.id ? item : s)) : [...prev, item]
    );
  }
  async function handleHowDelete(id) {
    await deleteHowItWorksStep(id);
    setHowItWorksSteps((prev) => prev.filter((s) => s.id !== id));
  }

  function handleTestimonialSaved(item, isEdit) {
    setTestimonials((prev) =>
      isEdit ? prev.map((t) => (t.id === item.id ? item : t)) : [...prev, item]
    );
  }
  async function handleTestimonialDelete(id) {
    await deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  }

  if (loading || !settings) {
    return <div className="container" style={{ padding: '80px 24px' }}>Loading...</div>;
  }

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero__bg-img ${i === activeImage ? 'hero__bg-img--active' : ''}`}
          />
        ))}
        <div className="hero__overlay" />
        <div className="container hero__content">
          <div className="hero__heading">
            <h1>
              {settings.heroHeading.split('.')[0]}.
              <br />
              <strong>{settings.heroHeading.split('.')[1]?.trim()}</strong>
            </h1>
            <p className="hero__sub">{settings.heroSubtext}</p>
          </div>

          <div className="hero__search">
            <input type="text" placeholder="Search by city, location, project or developer" />
            <Link to="/listings" className="hero__search-btn">
              <span>⌕</span>Search
            </Link>
          </div>

          <div className="hero__property-type">
            <Link to="/listings?propertyType=residential" className="hero__type hero__type--active">
              Residential
            </Link>
            <Link to="/listings?propertyType=commercial" className="hero__type">
              Commercial
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <p className="hero__stat-num">{properties.length}+</p>
              <p className="hero__stat-label">ACTIVE LISTINGS</p>
            </div>
            <div className="hero__stat">
              <p className="hero__stat-num">{settings.statsCitiesCount}</p>
              <p className="hero__stat-label">CITIES</p>
            </div>
            <div className="hero__stat">
              <p className="hero__stat-num">{settings.statsDevelopersCount}</p>
              <p className="hero__stat-label">DEVELOPERS</p>
            </div>
            <div className="hero__stat">
              <p className="hero__stat-num">{settings.statsPropertiesCount}</p>
              <p className="hero__stat-label">PROPERTIES</p>
            </div>
          </div>
        </div>

        <div className="hero__dots">
          {heroImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              className={`hero__dot ${i === activeImage ? 'hero__dot--active' : ''}`}
              onClick={() => setActiveImage(i)}
            />
          ))}
        </div>
      </section>

      {/* TRENDING PROJECTS */}
      <section className="trending-projects">
        <div className="container">
          <div className="section-heading">
            <h2>{settings.trendingHeading}</h2>
            <p>{settings.trendingSubtext}</p>
            {isAdmin && (
              <button type="button" className="btn btn-gold" onClick={() => setTrendingModal({ type: 'add' })}>
                + Add project
              </button>
            )}
          </div>
          <div className="trending-projects__row">
            <div className="trending-intro">
              <div className="trending-intro__icon">⌂</div>
              <h3>Best Sellers in india</h3>
              <p>
                The latest residential offerings from the best builders in india, handpicked by
                our team of experts just for you and backed by our widely acclaimed transaction
                and financial services.
              </p>
              <Link to="/listings" className="trending-intro__btn">View All</Link>
            </div>

            <div className="trending-list">
              {trendingProjects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="project-card__image">
                    <img src={project.imageUrl} alt={project.name} />
                    {project.isNew && <span className="project-card__badge">New launch</span>}
                    {isAdmin ? (
                      <div className="project-card__admin">
                        <SectionAdminControls
                          itemLabel={project.name}
                          onEdit={() => setTrendingModal({ type: 'edit', item: project })}
                          onDelete={() => handleTrendingDelete(project.id)}
                        />
                      </div>
                    ) : (
                      <button className="project-card__heart" type="button" aria-label="Add to favourites">♡</button>
                    )}
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__title-row">
                      <h3>{project.name}</h3>
                      <span className="project-card__rera">RERA<b>✓</b></span>
                    </div>
                    <p className="project-card__builder">By {project.builder}</p>
                    <p className="project-card__location">{project.location}</p>
                    <div className="project-card__meta">
                      <span>{project.type}</span>
                      <span>{project.area}</span>
                    </div>
                    <div className="project-card__footer">
                      <strong>{project.price}</strong>
                      <Link to="/contact" className="project-card__contact">Contact</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose">
        <div className="container why-choose__row">
          <div className="why-choose__media">
            <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000" alt="Why choose us" />
            <div className="why-choose__badge">
              <p className="why-choose__badge-num">{settings.whyChooseUsYearsExperience}</p>
              <p className="why-choose__badge-label">YEARS EXPERIENCE</p>
            </div>
          </div>
          <div className="why-choose__content">
            <div className="why-choose__head-row">
              <div>
                <h6>Why Choose Us</h6>
                <h2>{settings.whyChooseUsHeading}</h2>
              </div>
              {isAdmin && (
                <button type="button" className="btn btn-gold" onClick={() => setWhyModal({ type: 'add' })}>
                  + Add item
                </button>
              )}
            </div>
            <p>{settings.whyChooseUsDescription}</p>
            <div className="why-choose__grid">
              {whyChooseUsItems.map((item) => (
                <div className="why-choose__item" key={item.id}>
                  <div className="why-choose__icon">{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="why-choose__item-row">
                      <h4>{item.title}</h4>
                      {isAdmin && (
                        <SectionAdminControls
                          itemLabel={item.title}
                          onEdit={() => setWhyModal({ type: 'edit', item })}
                          onDelete={() => handleWhyDelete(item.id)}
                        />
                      )}
                    </div>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-heading">
            <h2>{settings.howItWorksHeading}</h2>
            <p>{settings.howItWorksSubtext}</p>
            {isAdmin && (
              <button type="button" className="btn btn-gold" onClick={() => setHowModal({ type: 'add' })}>
                + Add step
              </button>
            )}
          </div>
          <div className="how-it-works__grid">
            {howItWorksSteps.map((item, i) => (
              <div className="how-it-works__card" key={item.id}>
                {isAdmin && (
                  <div className="how-it-works__admin">
                    <SectionAdminControls
                      itemLabel={item.title}
                      onEdit={() => setHowModal({ type: 'edit', item })}
                      onDelete={() => handleHowDelete(item.id)}
                    />
                  </div>
                )}
                <div className="how-it-works__step">{item.stepLabel}</div>
                <div className="how-it-works__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {i < howItWorksSteps.length - 1 && <span className="how-it-works__arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="container featured">
        <div className="featured__head">
          <div>
            <h2>Featured listings</h2>
            <p>Handpicked properties worth your attention</p>
          </div>
          <Link to="/listings" className="featured__link">View all →</Link>
        </div>
        <PropertyGrid properties={featured} />
      </section>

      {/* FEATURED CITIES */}
      <section className="featured-cities">
        <div className="container">
          <div className="section-heading">
            <h2>{settings.citiesHeading}</h2>
            <p>{settings.citiesSubtext}</p>
            {isAdmin && (
              <button type="button" className="btn btn-gold" onClick={() => setCityModal({ type: 'add' })}>
                + Add city
              </button>
            )}
          </div>
          <div className="cities-grid">
            {featuredCities.map((city) => (
              <div className="city-card" key={city.id} style={{ position: 'relative' }}>
                {isAdmin && (
                  <div className="city-card__admin">
                    <SectionAdminControls
                      itemLabel={city.name}
                      onEdit={() => setCityModal({ type: 'edit', item: city })}
                      onDelete={() => handleCityDelete(city.id)}
                    />
                  </div>
                )}
                <Link to={`/listings?city=${city.name}`} className="city-card__link">
                  <div className="city-card__image">
                    <img src={city.imageUrl} alt={city.name} />
                    <div className="city-card__overlay" />
                    <h3>{city.name}</h3>
                  </div>
                  <div className="city-card__bottom">{city.optionsCount} Options</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container">
          <div className="section-heading">
            <h2>{settings.testimonialsHeading}</h2>
            <p>{settings.testimonialsSubtext}</p>
            {isAdmin && (
              <button type="button" className="btn btn-gold" onClick={() => setTestimonialModal({ type: 'add' })}>
                + Add testimonial
              </button>
            )}
          </div>
          <div className="testimonials__grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id} style={{ position: 'relative' }}>
                {isAdmin && (
                  <div className="testimonial-card__admin">
                    <SectionAdminControls
                      itemLabel={t.name}
                      onEdit={() => setTestimonialModal({ type: 'edit', item: t })}
                      onDelete={() => handleTestimonialDelete(t.id)}
                    />
                  </div>
                )}
                <div className="testimonial-card__stars">
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <img src={t.avatarUrl} alt={t.name} />
                  <div>
                    <h5>{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>{settings.ctaHeading}</h2>
            <p>{settings.ctaSubtext}</p>
          </div>
          <Link to="/contact" className="cta-banner__btn">Get In Touch</Link>
        </div>
      </section>

      {/* ENQUIRY */}
      <section className="enquiry">
        <div className="container enquiry__row">
          <div className="enquiry__info">
            <h6>Get In Touch</h6>
            <h2>Have a Property in Mind? Let's Talk.</h2>
            <p>Share your requirements and our advisors will get back to you within 24 hours with the best matching options.</p>
            <div className="enquiry__points">
              <div className="enquiry__point">
                <div className="enquiry__point-icon">📞</div>
                <div>
                  <h5>Call Us</h5>
                  <p>{settings.contactPhone} — {settings.contactPhoneHours}</p>
                </div>
              </div>
              <div className="enquiry__point">
                <div className="enquiry__point-icon">✉️</div>
                <div>
                  <h5>Email Us</h5>
                  <p>{settings.contactEmail}</p>
                </div>
              </div>
              <div className="enquiry__point">
                <div className="enquiry__point-icon">📍</div>
                <div>
                  <h5>Visit Us</h5>
                  <p>{settings.contactAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <form className="enquiry__form" onSubmit={handleSubmit}>
            <div className="enquiry__form-row">
              <div className="enquiry__field">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="enquiry__field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="enquiry__form-row">
              <div className="enquiry__field">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="enquiry__field">
                <label htmlFor="propertyType">Interested In</label>
                <select id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plots">Plots</option>
                </select>
              </div>
            </div>
            <div className="enquiry__field" style={{ marginBottom: '20px' }}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us what you're looking for — budget, location, BHK, etc." value={form.message} onChange={handleChange} />
            </div>
            {enquiryError && (
              <p style={{ color: '#b23b3b', fontSize: 13, marginBottom: 12 }}>{enquiryError}</p>
            )}

            <button type="submit" className="enquiry__submit" disabled={enquirySending || submitted}>
              {submitted
                ? "Sent! We'll be in touch soon"
                : enquirySending
                  ? 'Sending...'
                  : 'Submit Enquiry'}
            </button>
            <p className="enquiry__note">By submitting, you agree to be contacted regarding your enquiry.</p>
          </form>
        </div>
      </section>

      <TrendingProjectFormModal mode={trendingModal} onClose={() => setTrendingModal(null)} onSaved={handleTrendingSaved} />
      <FeaturedCityFormModal mode={cityModal} onClose={() => setCityModal(null)} onSaved={handleCitySaved} />
      <WhyChooseUsFormModal mode={whyModal} onClose={() => setWhyModal(null)} onSaved={handleWhySaved} />
      <HowItWorksFormModal mode={howModal} onClose={() => setHowModal(null)} onSaved={handleHowSaved} />
      <TestimonialFormModal mode={testimonialModal} onClose={() => setTestimonialModal(null)} onSaved={handleTestimonialSaved} />
    </div>
  );
}