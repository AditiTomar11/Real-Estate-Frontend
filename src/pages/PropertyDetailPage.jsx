import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertiesContext';
import PropertyGallery from '../components/property/PropertyGallery';
import { useFavorites } from '../context/FavoritesContext';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';
import { useAdminModal } from '../context/AdminModalContext';
import { submitEnquiry } from '../api/enquiryApi';
import { formatPrice } from '../utils/formatPrice';
import './PropertyDetailPage.css';

export default function PropertyDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { properties, deleteProperty } = useProperties();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare, compareIds, maxCompare } = useCompare();
  const { isAdmin, user } = useAuth();
  const { openEdit } = useAdminModal();
  const property = properties.find((p) => String(p.id) === id);

  const [enquiryForm, setEnquiryForm] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '',
    message: '',
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');
  const [enquirySending, setEnquirySending] = useState(false);

  // Prefill from the logged-in user, and keep it in sync if they log in
  // while this page is already open.
  useEffect(() => {
    if (user) {
      setEnquiryForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  function handleEnquiryChange(e) {
    setEnquiryForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (enquiryError) setEnquiryError('');
  }

  async function handleEnquirySubmit(e) {
    e.preventDefault();
    setEnquirySending(true);
    setEnquiryError('');
    try {
      await submitEnquiry({
        propertyId: property.id,
        name: enquiryForm.name,
        phone: enquiryForm.phone,
        email: enquiryForm.email,
        message: enquiryForm.message,
      });
      setEnquirySubmitted(true);
    } catch (err) {
      setEnquiryError(err.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setEnquirySending(false);
    }
  }

  if (!property) {
    return (
      <div className="container detail-missing">
        <p>This listing isn't available anymore.</p>
        <Link to="/listings" className="btn btn-outline">
          Back to listings
        </Link>
      </div>
    );
  }

  const { title, city, locality, type, bhk, price, areaSqft, status, description, images } = property;

  return (
    <div className="container detail">
      <Link to="/listings" className="detail__back">
        ← Back to listings
      </Link>

      <div className="detail__layout">
        <div className="detail__gallery">
          <PropertyGallery images={images} title={title} />
        </div>

        <div className="detail__info">
          <p className="detail__price">
            {formatPrice(price)}
            {status === 'SOLD' && <span className="detail__sold"> · Sold</span>}
          </p>
          <h1>{title}</h1>
          <p className="detail__location">
            {locality}, {city}
          </p>

          <div className="detail__facts">
            <div>
              <p className="detail__fact-label">Type</p>
              <p className="detail__fact-val">{type === 'RESIDENTIAL' ? 'Residential' : 'Commercial'}</p>
            </div>
            {bhk > 0 && (
              <div>
                <p className="detail__fact-label">Configuration</p>
                <p className="detail__fact-val">{bhk} BHK</p>
              </div>
            )}
            <div>
              <p className="detail__fact-label">Area</p>
              <p className="detail__fact-val">{areaSqft.toLocaleString('en-IN')} sq.ft</p>
            </div>
          </div>

          <p className="detail__desc">{description}</p>

          {isAdmin && (
            <div className="detail__admin-row">
              <button type="button" className="btn btn-outline" onClick={() => openEdit(property)}>
                Edit listing
              </button>
              <button
                type="button"
                className="btn btn-outline detail__delete-btn"
                onClick={() => {
                  if (window.confirm(`Delete "${title}"? This can't be undone.`)) {
                    deleteProperty(property.id);
                    navigate('/listings');
                  }
                }}
              >
                Delete listing
              </button>
            </div>
          )}

          <div className="detail__actions">
            <button
              type="button"
              className={`btn ${isFavorite(property.id) ? 'btn-outline' : 'btn-primary'}`}
              onClick={() => toggleFavorite(property.id)}
            >
              {isFavorite(property.id) ? '♥ Saved' : '♡ Save to favorites'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              disabled={!isComparing(property.id) && compareIds.length >= maxCompare}
              onClick={() => toggleCompare(property.id)}
            >
              {isComparing(property.id) ? 'Remove from compare' : 'Add to compare'}
            </button>
          </div>

          <div className="detail__enquiry">
            <h3>Interested in this property?</h3>
            {enquirySubmitted ? (
              <p className="detail__enquiry-success">
                Thanks — we've received your enquiry and will get back to you soon.
              </p>
            ) : (
              <form className="detail__enquiry-form" onSubmit={handleEnquirySubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={enquiryForm.name}
                  onChange={handleEnquiryChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={enquiryForm.phone}
                  onChange={handleEnquiryChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={enquiryForm.email}
                  onChange={handleEnquiryChange}
                />
                <textarea
                  name="message"
                  placeholder="Message (optional)"
                  rows={3}
                  value={enquiryForm.message}
                  onChange={handleEnquiryChange}
                />
                {enquiryError && <p className="detail__enquiry-error">{enquiryError}</p>}
                <button type="submit" className="btn btn-gold" disabled={enquirySending}>
                  {enquirySending ? 'Sending...' : 'Send enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}