import { Link } from 'react-router-dom';
import CompareTable from '../components/compare/CompareTable';
import { useProperties } from '../context/PropertiesContext';
import { useCompare } from '../context/CompareContext';
import './ComparePage.css';

export default function ComparePage() {
  const { properties: allProperties } = useProperties();
  const { compareIds, clearCompare } = useCompare();
  const properties = allProperties.filter((property) => compareIds.includes(property.id));

  return (
    <div className="container compare-page">
      <div className="compare-page__head">
        <h1>Compare properties</h1>
        {properties.length > 0 && (
          <button type="button" className="compare-page__clear" onClick={clearCompare}>
            Clear all
          </button>
        )}
      </div>

      {properties.length < 2 ? (
        <div className="compare-page__empty">
          <p>Pick at least 2 properties from any listing to compare them here.</p>
          <Link to="/listings" className="btn btn-gold">
            Browse listings
          </Link>
        </div>
      ) : (
        <CompareTable properties={properties} />
      )}
    </div>
  );
}