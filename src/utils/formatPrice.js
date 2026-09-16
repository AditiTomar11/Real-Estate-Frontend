// Formats a number as Indian currency shorthand, e.g. 9500000 -> "95 Lac", 32000000 -> "3.2 Cr"
export function formatPrice(value) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2).replace(/\.00$/, '')} Lac`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}
