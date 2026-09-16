import { useMemo } from 'react';
import { useProperties } from '../context/PropertiesContext';
import { useAuth } from '../context/AuthContext';
import { useAdminModal } from '../context/AdminModalContext';
import { useFilters } from '../hooks/useFilters';
import FilterPanel from '../components/filters/FilterPanel';
import PropertyGrid from '../components/property/PropertyGrid';
import './ListingsPage.css';

export default function ListingsPage() {
  const { properties, loading, error } = useProperties();
  const { isAdmin } = useAuth();
  const { openAdd } = useAdminModal();
  const { filters, setFilter, resetFilters } = useFilters();

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const query = filters.query.trim().toLowerCase();
      const matchesQuery =
        !query ||
        property.title.toLowerCase().includes(query) ||
        property.locality.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query);

      const matchesCity = !filters.city || property.city === filters.city;
      const matchesType = !filters.type || property.type === filters.type;
      const matchesBhk = !filters.bhk || String(property.bhk) === String(filters.bhk);

      const minPrice = Number(filters.minPrice) || 0;
      const maxPrice = Number(filters.maxPrice) || Number.POSITIVE_INFINITY;
      const matchesPrice = property.price >= minPrice && property.price <= maxPrice;

      return matchesQuery && matchesCity && matchesType && matchesBhk && matchesPrice;
    });
  }, [properties, filters]);

  return (
    <div className="container listings">
      <div className="listings__head">
        <div>
          <h1>Browse properties</h1>
          {loading && <p>Loading properties...</p>}
          {error && <p>{error}</p>}
          {!loading && <p>{filtered.length} results</p>}
        </div>
        {isAdmin && (
          <button type="button" className="btn btn-gold" onClick={openAdd}>
            + Add property
          </button>
        )}
      </div>

      <div className="listings__layout">
        <aside className="listings__sidebar">
          <FilterPanel filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
        </aside>
        <div className="listings__main">
          <PropertyGrid properties={filtered} />
        </div>
      </div>
    </div>
  );
}