export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US').format(number);
}
