import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { openLogin } = useAuthModal();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    
    setScrolled(false);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__row">
        <Link to="/" className="navbar__logo">
          Bhoomi<span>.</span>
        </Link>

        <nav className="navbar__links">
          <NavLink to="/listings" className="navbar__link">
            Browse
          </NavLink>
          <NavLink to="/compare" className="navbar__link">
            Compare
          </NavLink>
          <NavLink to="/favorites" className="navbar__link">
            Saved
          </NavLink>
          <NavLink to="/about" className="navbar__link">
            About
          </NavLink>
         {isAuthenticated && (
           <NavLink to="/my-enquiries" className="navbar__link">
             My Enquiries
           </NavLink>
         )}
         {isAdmin && (
           <NavLink to="/admin/inbox" className="navbar__link">
             Admin Inbox
           </NavLink>
         )}
       </nav>

       <div className="navbar__actions">
         {isAuthenticated ? (
           <>
             <span className="navbar__user">Hi, {user.name}</span>
             <button type="button" className="btn btn-outline navbar__login" onClick={logout}>
               Log out
             </button>
           </>
         ) : (
           <button type="button" className="btn btn-outline navbar__login" onClick={openLogin}>
             Log in
           </button>
         )}
       </div>
      </div>
    </header>
  );
}