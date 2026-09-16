import { formatPrice } from '../../utils/formatPrice';
import './CompareTable.css';

const ROWS = [
  { label: 'Price', get: (p) => formatPrice(p.price) },
  { label: 'City', get: (p) => p.city },
  { label: 'Locality', get: (p) => p.locality },
  { label: 'Type', get: (p) => (p.type === 'RESIDENTIAL' ? 'Residential' : 'Commercial') },
  { label: 'BHK', get: (p) => (p.bhk > 0 ? `${p.bhk} BHK` : '—') },
  { label: 'Area', get: (p) => `${p.areaSqft.toLocaleString('en-IN')} sq.ft` },
  { label: 'Status', get: (p) => (p.status === 'SOLD' ? 'Sold' : 'Available') },
];

export default function CompareTable({ properties }) {
  return (
    <div className="ctable-wrap">
      <table className="ctable">
        <thead>
          <tr>
            <th className="ctable__row-label"></th>
            {properties.map((p) => (
              <th key={p.id} className="ctable__col-head">
                <img src={p.images[0]} alt={p.title} />
                <p>{p.title}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <td className="ctable__row-label">{row.label}</td>
              {properties.map((p) => (
                <td key={p.id}>{row.get(p)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}