/**
 * Formats a numeric price into US Dollar currency format (e.g., $25.00).
 * Handles raw integers and scaled numbers cleanly.
 */
export const formatDollar = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return "$0.00";
  }

  let numPrice = Number(price);

  // If price in DB is stored in thousands (e.g. 25000), convert to realistic dollar value (25.00)
  if (numPrice >= 1000) {
    numPrice = numPrice / 1000;
  }

  return `$${numPrice.toFixed(2)}`;
};

export const formatNaira = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return "₦0";
  }
  let numPrice = Number(price);
  if (numPrice > 0 && numPrice < 1000) {
    numPrice = numPrice * 1000;
  }
  return `₦${numPrice.toLocaleString("en-NG")}`;
};

export const formatPrice = formatDollar;
export default formatDollar;
