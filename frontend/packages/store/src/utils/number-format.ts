export function fNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}

export function fData(value: number) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const decimal = 2
  const baseValue = 1024

  const index = Math.floor(Math.log(value) / Math.log(baseValue))
  const fm = `${parseFloat((value / baseValue ** index).toFixed(decimal))} ${units[index]}`

  return fm
}
