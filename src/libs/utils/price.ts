export function calculatePriceDecrease(price: number, previousPrice: number) {
  const decrease = ((previousPrice - price) / previousPrice) * 100;
  return decrease;
}
