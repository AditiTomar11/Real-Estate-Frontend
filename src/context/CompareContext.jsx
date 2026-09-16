import { createContext, useContext, useState } from 'react';

const MAX_COMPARE = 4;
const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);

  function toggleCompare(propertyId) {
    setCompareIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, propertyId];
    });
  }

  function isComparing(propertyId) {
    return compareIds.includes(propertyId);
  }

  function clearCompare() {
    setCompareIds([]);
  }

  return (
    <CompareContext.Provider
      value={{ compareIds, toggleCompare, isComparing, clearCompare, maxCompare: MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used inside a CompareProvider');
  }
  return ctx;
}