import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import PropertyDetailPage from '../pages/PropertyDetailPage';
import AboutPage from '../pages/AboutPage';
import FavoritesPage from '../pages/FavoritesPage';
import ComparePage from '../pages/ComparePage';
import AdminInboxPage from '../pages/AdminInboxPage';
import MyEnquiriesPage from '../pages/MyEnquiriesPage';

// Login/Register are a modal now (see AuthModal), not standalone pages —
// LoginPage.jsx and RegisterPage.jsx are unused and can be deleted.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<PropertyDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/admin/inbox" element={<AdminInboxPage />} />
      <Route path="/my-enquiries" element={<MyEnquiriesPage />} />
    </Routes>
  );
}