import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as propertyApi from '../api/propertyApi';
import dummyProperties from '../data/dummyProperties';

const PropertiesContext = createContext(null);

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState(dummyProperties);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProperties = useCallback(async (filters = {}) => {
    setLoading(true);
    setError('');

    try {
      const data = await propertyApi.getProperties(filters);
      const nextProperties = Array.isArray(data) ? data : data?.content || [];

      if (nextProperties.length === 0) {
        setProperties(dummyProperties);
        return;
      }

      setProperties(nextProperties);
    } catch (err) {
      console.warn('Failed to load properties from backend; using local fallback data.', err);
      setProperties(dummyProperties);
      setError('');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  async function addProperty(data) {
    const created = await propertyApi.createProperty(data);
    setProperties((prev) => [created, ...prev]);
  }

  async function updateProperty(id, data) {
    const updated = await propertyApi.updateProperty(id, data);
    setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }

  async function deleteProperty(id) {
    await propertyApi.deleteProperty(id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <PropertiesContext.Provider
      value={{ properties, loading, error, loadProperties, addProperty, updateProperty, deleteProperty }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertiesContext);
  if (!ctx) throw new Error('useProperties must be used inside a PropertiesProvider');
  return ctx;
}