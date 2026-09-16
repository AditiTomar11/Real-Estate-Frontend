import PropertyCard from './PropertyCard';
import './PropertyGrid.css';

export default function PropertyGrid({ properties }) {
  if (!properties.length) {
    return (
      <div className="pgrid-empty">
        <p>No properties match these filters. Try widening your search.</p>
      </div>
    );
  }

  return (
    <div className="pgrid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
