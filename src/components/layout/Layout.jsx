import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CompareBar from '../compare/CompareBar';
import AuthModal from '../auth/AuthModal';
import AdminPropertyModal from '../admin/AdminPropertyModal';
import FloatingContact from '../FloatingContact';

const NO_OFFSET_ROUTES = ['/'];

export default function Layout({ children }) {
  const location = useLocation();
  const needsOffset = !NO_OFFSET_ROUTES.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }} className={needsOffset ? 'page-offset' : ''}>
        {children}
      </main>
      <CompareBar />
      <Footer />
      <AuthModal />
      <AdminPropertyModal />
      <FloatingContact />
    </>
  );
}