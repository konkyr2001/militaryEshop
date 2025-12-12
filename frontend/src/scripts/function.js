function formatPrice(num) {
  const number = Number(num).toFixed(2);
  const [intPart, floatPart] = number.split(".");

  if (!floatPart) return intPart;
  if (floatPart == 0) return intPart;

  return number;
}

export {formatPrice}