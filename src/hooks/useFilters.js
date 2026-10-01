import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../context/PropertiesContext';

export function useFilters() {
  const { loadProperties } = useProperties();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('query') || '',
    city: searchParams.get('city') || '',
    type: (searchParams.get('type') || '').toUpperCase(),
    bhk: '',
    minPrice: '',
    maxPrice: '',
  }));
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ query: '', city: '', type: '', bhk: '', minPrice: '', maxPrice: '' });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProperties(filters);
    }, 400);
    return () => clearTimeout(timer);
  }, [filters, loadProperties]);

  return { filters, setFilter, resetFilters };
}
