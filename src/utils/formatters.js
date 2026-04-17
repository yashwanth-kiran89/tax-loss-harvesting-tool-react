// Convert large numbers to K/M/B format
export const formatNumber = (num) => {
  if (num === undefined || num === null) return "$0";
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";
  if (absNum >= 1e9) return sign + "$" + (absNum / 1e9).toFixed(2) + "B";
  if (absNum >= 1e6) return sign + "$" + (absNum / 1e6).toFixed(2) + "M";
  if (absNum >= 1e3) return sign + "$" + (absNum / 1e3).toFixed(2) + "K";
  return sign + "$" + absNum.toFixed(2);
};

// For holdings, current price etc. (no $ sign)
export const formatNumberPlain = (num) => {
  if (num === undefined || num === null) return "0";
  const absNum = Math.abs(num);
  if (absNum >= 1e9) return (absNum / 1e9).toFixed(2) + "B";
  if (absNum >= 1e6) return (absNum / 1e6).toFixed(2) + "M";
  if (absNum >= 1e3) return (absNum / 1e3).toFixed(2) + "K";
  return absNum.toFixed(2);
};