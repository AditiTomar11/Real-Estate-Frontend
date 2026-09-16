import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModalProvider } from './context/AuthModalContext';
import { PropertiesProvider } from './context/PropertiesContext';
import { AdminModalProvider } from './context/AdminModalContext';
import { EnquiriesProvider } from './context/EnquiriesContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthModalProvider>
          <PropertiesProvider>
            <AdminModalProvider>
              <FavoritesProvider>
                <CompareProvider>
                  <EnquiriesProvider>
                    <Layout>
                      <AppRoutes />
                    </Layout>
                  </EnquiriesProvider>
                </CompareProvider>
              </FavoritesProvider>
            </AdminModalProvider>
          </PropertiesProvider>
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}