export function fNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}
