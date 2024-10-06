import dayjs from 'dayjs'

export function getMonthRange(year: number, month: number) {
  const start = dayjs().year(year).month(month).startOf('month').format('YYYY-MM-DDTHH:mm:ss')
  const end = dayjs().year(year).month(month).endOf('month').format('YYYY-MM-DDTHH:mm:ss')

  return { start, end }
}

export function parseDateString(dateString: string): Date | null {
  const numbers = dateString.match(/\d+/g)
  if (!numbers || numbers.length < 3) {
    return null
  }

  let [year, month, day] = numbers.map(Number)
  if (year < 1000) {
    year += 2000
  }
  month = month > 12 ? 12 : month
  day = day > 31 ? 31 : day

  const parsedDate = dayjs(`${year}-${month}-${day}`)
  if (parsedDate.isValid()) {
    return parsedDate.toDate()
  }
  return null
}
