import { CITIES, PROPERTY_TYPES, BHK_OPTIONS } from '../../data/dummyProperties';
import './FilterPanel.css';

export default function FilterPanel({ filters, setFilter, resetFilters }) {
  return (
    <div className="filterpanel">
      <div className="filterpanel__field">
        <label htmlFor="f-query">Search</label>
        <input
          id="f-query"
          type="text"
          placeholder="Locality, project name..."
          value={filters.query}
          onChange={(e) => setFilter('query', e.target.value)}
        />
      </div>

      <div className="filterpanel__field">
        <label htmlFor="f-city">City</label>
        <select id="f-city" value={filters.city} onChange={(e) => setFilter('city', e.target.value)}>
          <option value="">All cities</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="filterpanel__field">
        <label htmlFor="f-type">Type</label>
        <select id="f-type" value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
          <option value="">Residential &amp; commercial</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === 'RESIDENTIAL' ? 'Residential' : 'Commercial'}
            </option>
          ))}
        </select>
      </div>

      <div className="filterpanel__field">
        <label htmlFor="f-bhk">BHK</label>
        <select id="f-bhk" value={filters.bhk} onChange={(e) => setFilter('bhk', e.target.value)}>
          <option value="">Any</option>
          {BHK_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} BHK
            </option>
          ))}
        </select>
      </div>

      <div className="filterpanel__field filterpanel__field--range">
        <label>Price range</label>
        <div className="filterpanel__range-row">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilter('minPrice', e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilter('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <button type="button" className="filterpanel__reset" onClick={resetFilters}>
        Clear filters
      </button>
    </div>
  );
}
